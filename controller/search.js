const { Op } = require('sequelize');
const User = require('../model/user');
const Course = require('../model/course');
const Lesson = require('../model/lesson');

const search = async (req, res) => {
    const { keyword } = req.query;

    if (!keyword || !keyword.trim()) {
        return res.status(400).json({ message: 'keyword is required' });
    }

    try {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${keyword}%` } },
                    { username: { [Op.iLike]: `%${keyword}%` } },
                    { email: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        });

        const courses = await Course.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${keyword}%` } },
                    { description: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        });

        const lessons = await Lesson.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${keyword}%` } },
                    { content: { [Op.iLike]: `%${keyword}%` } }
                ]
            }
        });

        const results = {
            users,
            courses,
            lessons
        };

        res.json(results);
    } catch (error) {
        console.error('search error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = { search };