const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, uploadSerti, uploadTask, registerAdminController, loginAdminController } = require('../controller/admincontroller');

// Mengatur multer untuk menerima file (single file upload)
const storage = multer.memoryStorage(); // Gunakan memory storage untuk buffer
const upload = multer({ storage });

// Route untuk upload file
router.post('/upload-modul', upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), uploadFile);
router.post('/upload-serti', upload.single('image'), uploadSerti);
router.post('/upload-task', upload.single('file'), uploadTask);
router.post('/register', registerAdminController);
router.post('/login', loginAdminController);

module.exports = router;