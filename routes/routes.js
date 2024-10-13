// route.js
const express = require('express');
const moduleController = require('../controller/moduleController');
const certificateController = require('../controller/certificateController');
const taskController = require('../controller/taskController');

const router = express.Router();

router.post('/send-module', moduleController.postModule);
router.get('/see-module', moduleController.getModules);

router.post('/send-certificate', certificateController.postCertificate);
router.get('/see-certificate', certificateController.getCertificates);

router.post('/tasks', taskController.postTask);
router.get('/tasks', taskController.getTasks);  
router.get('/tasks/:id', taskController.getTask);

module.exports = router;