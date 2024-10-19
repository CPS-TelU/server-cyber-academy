const express = require('express');
const taskController = require('../controller/taskController');

const router = express.Router();

router.post('/tasks', taskController.postTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTask);

module.exports = router;
