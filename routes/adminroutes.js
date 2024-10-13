const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, uploadSerti, uploadSubmis, registerAdminController } = require('../controller/admincontroller');

// Mengatur multer untuk menerima file (single file upload)
const storage = multer.memoryStorage(); // Gunakan memory storage untuk buffer
const upload = multer({ storage });

// Route untuk upload file
router.post('/upload-modul', upload.single('file'), uploadFile);
router.post('/upload-serti', upload.single('image'), uploadSerti);
router.post('/upload-submis', upload.single('file'), uploadSubmis);
router.post('/register', registerAdminController);

module.exports = router;