const express = require('express');
const router = express.Router();
const { create, get, getById, update, remove } = require('../controller/course');
const { getCache, setCache, deleteCache } = require('../cache/service');

router.post('/', create);

router.get('/', async (req, res, next) => {
    try {
        const cachedCourses = await getCache('courses');
        if (cachedCourses) {
          return res.json(cachedCourses);
        }
        const courses = await get(req, res, next);
        await setCache('courses', courses);
        res.json(courses);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const cachedCourse = await getCache(`course:${id}`);
        if (cachedCourse) {
        return res.json(cachedCourse);
        }
        const course = await getById(req, res, next);
        await setCache(`course:${id}`, course);
        res.json(course);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', update);

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteCache(`course:${id}`);
        await deleteCache('courses');
        await remove(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;