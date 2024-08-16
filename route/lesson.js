const express = require('express');
const router = express.Router();
const { create, getLBC, getById, update, remove } = require('../controller/lesson');

router.post('/', create);

router.get('/:courseId', getLBC);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;