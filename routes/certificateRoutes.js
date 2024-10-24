const express = require('express');
const certificateController = require('../controller/certificateController');

const router = express.Router();

router.get('/get', certificateController.getAllCertificates);
router.get('/get/:id', certificateController.getCertificateById);
router.get('/user/:userId', certificateController.getCertificateByUserIdController);
router.post('/send', certificateController.createCertificate);
router.put('/update/:id', certificateController.updateCertificate);
router.delete('/delete/:id', certificateController.deleteCertificate);

module.exports = router;
