const { sequelize } = require('../src/db');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const sendEmail = require('../email/service');
const { deleteCache } = require('../cache/service');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;
    
        if (!name || !username || !email || !password || !confirmPassword) {
            return res.status(400).send('registration details are required complete');
        }

        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co\.[a-z]{2}|[a-z]{2})$/i;
            return regex.test(email);
        };
    
        if (!validateEmail(email)) {
            return res.status(400).send('invalid email format');
        }

        const validatePassword = (password) => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        };

        if (!validatePassword(password)) {
            return res.status(400).json({ error: `${password} does not meet password requirements, it must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.` });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'passwords do not match.' });
        }
    
        const existingUsername = await sequelize.query(
            'SELECT * FROM "Users" WHERE "username" COLLATE "en_US.utf8" = :username',
            {
                replacements: { username },
                type: Sequelize.QueryTypes.SELECT
            }
        );
        if (existingUsername.length > 0) {
            return res.status(409).send('username already exists');
        }

        const existingEmail = await sequelize.query(
            'SELECT * FROM "Users" WHERE "email" COLLATE "en_US.utf8" = :email',
            {
                replacements: { email },
                type: Sequelize.QueryTypes.SELECT
            }
        );
        if (existingEmail.length > 0) {
            return res.status(409).send('email already exists');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });
    
        try {
            await newUser.save();
            await deleteCache('users');

            await sendEmail(
            newUser.email,
            'Welcome to Kontex!',
            `Hi ${newUser.name},\n\nThank you for registering with us!\n\nBest regards,\nKontex Team`
            );

            return res.status(201).send({ 'user registered successfully': newUser });
        } catch (error) {
            if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            return res.status(409).send(`${duplicateField} already exists.`);
            }
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'error registering user', details: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { loginIdentifier, password } = req.body;
    
        if (!loginIdentifier || !password) {
            return res.status(400).send('username or email and password are required');
        }

        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co\.[a-z]{2}|[a-z]{2})$/i;
            return regex.test(email);
        };
    
        let user;
            if (validateEmail(loginIdentifier)) {
                user = await User.findOne({
                    where: { email: loginIdentifier } });
            } else {
                user = await User.findOne({ where: { username: loginIdentifier } });
            }

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send('invalid username or password.');
            }
    
            const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            await sendEmail(
            user.email,
            'New Login Detected',
            `Hi ${user.name},\n\nA new login to your account was detected. If this was not you, please reset your password immediately.\n\nBest regards,\nKontex Team`
            );

            res.json({ 'user login successful': user, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'error logging user', details: error.message });
    }
};

const reset = async (req, res) => {
    try {
        const { password, newPassword, confirmPassword } = req.body;
        const userId = req.params.id;
    
        if (!password || !newPassword || !confirmPassword) {
            return res.status(400).send('passwords are required')
        }
    
        const user = await User.findByPk(userId);
    
        if (!user) {
            return res.status(404).send('user not found');
        }
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(409).send('wrong password.');
        }
    
        const validatePassword = (password) => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        };
    
        if (!validatePassword(newPassword)) {
            return res.status(400).json({ error: `${newPassword} does not meet password requirements, it must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.` });
        }
    
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'passwords do not match.' });
        }
    
        user.password = await bcrypt.hash(newPassword, 10);
    
        await user.save();
    
        await deleteCache(`user:${userId}`);
        await deleteCache('users');
    
        await sendEmail(
            user.email,
            'Password Reset Successful',
            `Hi ${user.name},\n\nYour password has been successfully reset. If this was not you, please contact support immediately.\n\nBest regards,\nKontex Team`
        );
        
        res.status(200).send({'password resetted successfully': user});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'error resetting password', details: error.message });
    }
};
  
const update = async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.params.id;
  
        if (!username && !email) {
          return res.status(400).send('at least username, email, or new password is required');
        }
  
        const user = await User.findByPk(userId);
  
        if (!user) {
            return res.status(404).send('user not found');
        }
  
        let updateMessage = '';
        let subject = 'Your Account Has Been Updated';
  
        const validateEmail = (email) => {
          const regex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co\.[a-z]{2}|[a-z]{2})$/i;
          return regex.test(email);
        };
  
        if (username && username !== user.username) {
            const existingUsername = await sequelize.query(
                'SELECT * FROM "Users" WHERE "username" COLLATE "en_US.utf8" = :username',
                {
                    replacements: { username },
                    type: Sequelize.QueryTypes.SELECT
                }
            );
          if (existingUsername.length > 0) {
            return res.status(409).send('username already exists');
          }
          user.username = username;
          updateMessage += 'Your username has been successfully updated.\n';
        }
  
        if (email) {
          if (!validateEmail(email)) {
            return res.status(400).send('invalid email format');
          }
          if (email !== user.email) {
                const existingEmail = await sequelize.query(
                    'SELECT * FROM "Users" WHERE "email" COLLATE "en_US.utf8" = :email',
                    {
                        replacements: { email },
                        type: Sequelize.QueryTypes.SELECT
                    }
                );
            if (existingEmail.length > 0) {
              return res.status(409).send('email already exists');
            }
            user.email = email;
            updateMessage += 'Your email has been successfully updated.\n';
          }
        }
  
        if (updateMessage === '') {
          return res.status(400).send('no valid updates provided');
        }
  
        await user.save();
  
        await deleteCache(`user:${userId}`);
        await deleteCache('users');
  
        await sendEmail(
          user.email,
          subject,
          `Hi ${user.name},\n\n${updateMessage}\n\nBest regards,\nKontex Team`
        );
  
        res.status(200).send({'user updated successfully': user});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'error updating user', details: error.message });
    }
};
  
const remove = async (req, res) => {
    try {
        const userId = req.params.id;
  
        if (!userId) {
            return res.status(400).send('user ID is required');
        }
  
        const user = await User.findByPk(userId);
  
        if (!user) {
            return res.status(404).send('user not found');
        }

        await user.destroy();
  
        res.status(200).send('user deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('error deleting user');
    }
};
  
const get = async (req, res) => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('error fetching users:', error);
        return { data: null, status: 500 };
    }
};
  
const getId = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return { data: null, status: 404 };
        }
        return user;
    } catch (error) {
        console.error('error fetching user:', error);
        res.status(500).json({ error: 'internal server error' });
    }
};

module.exports = {register, login, reset, update, remove, get, getId};