const express = require('express');
const router = express.Router();
const { create, get, getById, update, remove } = require('../controller/course');

router.post('/', create);

router.get('/', get);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;