const express = require('express');
const router = express.Router();
const modulController = require('../controller/modulController');

// Create a new Modul
router.post('/send', modulController.createModul);

// Get all Moduls
router.get('/get', modulController.getAllModuls);

// Get a specific Modul by ID
router.get('/get/:id', modulController.getModulById);

// Update a Modul
router.put('/update/:id', modulController.updateModul);

// Delete a Modul
router.delete('/delete/:id', modulController.deleteModul);

module.exports = router;
