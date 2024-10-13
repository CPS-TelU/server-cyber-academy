const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, uploadSerti, uploadSubmis, getUsersController  } = require('../controller/admincontroller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-modul', upload.single('file'), uploadFile);
router.post('/upload-serti', upload.single('file'), uploadSerti);
router.post('/upload-submis', upload.single('file'), uploadSubmis);
router.get('/user-ca', getUsersController);

module.exports = router;