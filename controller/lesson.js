const Lesson = require('../model/lesson');

const create = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const newLesson = await Lesson.create({ title, content, courseId });
    res.status(201).json({ lesson: newLesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error creating lesson' });
  }
};

const getLBC = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.findAll({ where: { courseId } });
    res.status(200).json({ lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error fetching lessons' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return res.status(404).json({ error: 'lesson not found' });
    }
    res.status(200).json({ lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error fetching lesson' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return res.status(404).json({ error: 'lesson not found' });
    }
    lesson.title = title;
    lesson.content = content;
    await lesson.save();
    res.status(200).json({ lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error updating lesson' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByPk(id);
    if (!lesson) {
      return res.status(404).json({ error: 'lesson not found' });
    }
    await lesson.destroy();
    res.status(200).json({ message: 'lesson deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error deleting lesson' });
  }
};

module.exports = { create, getLBC, getById, update, remove };