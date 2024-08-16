const Lesson = require('../model/lesson');

const create = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const newLesson = await Lesson.create({ title, content, courseId });
    res.status(201).json({ 'lesson created successfully': newLesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error creating lesson' });
  }
};

const getLBC = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.findAll({ where: { courseId } });
    return lessons;
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
    return lesson;
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
    if (title !== undefined) {
        lesson.title = title;
    }
    if (content !== undefined) {
        lesson.content = content;
    }
    
    await lesson.save();
    
    await deleteCache(`lesson:${id}`);
    await deleteCache('lessons');

    res.status(200).json({ 'lesson updated successfully': lesson });
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