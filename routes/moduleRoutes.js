const express = require('express');
const moduleController = require('../controller/moduleController');

const router = express.Router();

router.post('/send-module', moduleController.postModule);
router.get('/see-module', moduleController.getModules);

module.exports = router;
