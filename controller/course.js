const Course = require('../model/course');
const Lesson = require('../model/lesson');

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCourse = await Course.create({ title, description });
    res.status(201).json({ 'course created successfully': newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error creating course' });
  }
};

const get = async (req, res) => {
  try {
    const courses = await Course.findAll({ include: [Lesson] });
    return courses;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error fetching courses' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id, { include: [Lesson] });
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    return course;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error fetching course' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    if (title !== undefined) {
        course.title = title;
    }
    if (description !== undefined) {
        course.description = description;
    }

    await course.save();

    await deleteCache(`course:${id}`);
    await deleteCache('courses');

    res.status(201).json({ 'course updated successfully': course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error updating course' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: 'course not found' });
    }
    await course.destroy();
    res.status(200).json({ message: 'course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error deleting course' });
  }
};

module.exports = { create, get, getById, update, remove };