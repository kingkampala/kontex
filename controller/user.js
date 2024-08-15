const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const User = require('../model/user');
const sendEmail = require('../email/service');
const { deleteCache } = require('../cache/service');
require('dotenv').config();

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
  
      const existingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
      if (existingUser) {
        return res.status(409).send('username already exists');
      }

      const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
      if (existingEmail) {
        return res.status(409).send('email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, username, email, password: hashedPassword });
  
      try {
        await newUser.save();
        await deleteCache('users');

        await sendEmail(
          newUser.email,
          'Welcome to Microshop!',
          `Hi ${newUser.name},\n\nThank you for registering with us!\n\nBest regards,\nMicroshop Team`
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
  
      if (validateEmail(loginIdentifier)) {
        const user = await User.findOne({ email: loginIdentifier });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).send('invalid email or password');
        }
  
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        await sendEmail(
          user.email,
          'New Login Detected',
          `Hi ${user.name},\n\nA new login to your account was detected. If this was not you, please reset your password immediately.\n\nBest regards,\nMicroshop Team`
        );

        res.json({ accessToken });
      } else {
        const user = await User.findOne({ username: loginIdentifier });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).send('invalid username or password');
        }
  
        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        await sendEmail(
          user.email,
          'New Login Detected',
          `Hi ${user.name},\n\nA new login to your account was detected. If this was not you, please reset your password immediately.\n\nBest regards,\nMicroshop Team`
        );

        res.json({ accessToken });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'error logging user', details: error.message });
    }
};

module.exports = {register, login};