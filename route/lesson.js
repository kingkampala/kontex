const express = require('express');
const router = express.Router();
const { create, getLBC, getById, update, remove } = require('../controller/lesson');
const { getCache, setCache, deleteCache } = require('../cache/service');

router.post('/', create);

router.get('/:courseId', async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const cachedLessons = await getCache(`lessons:${courseId}`);
        if (cachedLessons) {
          return res.json(cachedLessons);
        }
        const lessons = await getLBC(req, res, next);
        await setCache(`lessons:${courseId}`, lessons);
        res.json(lessons);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const cachedLesson = await getCache(`lesson:${id}`);
        if (cachedLesson) {
        return res.json(cachedLesson);
        }
        const lesson = await getById(req, res, next);
        await setCache(`lesson:${id}`, lesson);
        res.json(lesson);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', update);

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteCache(`lesson:${id}`);
        await deleteCache('lessons');
        await remove(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;