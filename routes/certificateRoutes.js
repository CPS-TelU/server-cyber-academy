const express = require('express');
const certificateController = require('../controller/certificateController');

const router = express.Router();

router.post('/send-certificate', certificateController.postCertificate);
router.get('/see-certificate', certificateController.getCertificates);

module.exports = router;
