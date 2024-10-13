const express = require('express');
const router = express.Router();
const modulController = require('../controller/modulController');

// Create a new Modul
router.post('/', modulController.createModul);

// Get all Moduls
router.get('/', modulController.getAllModuls);

// Get a specific Modul by ID
router.get('/:id', modulController.getModulById);

// Update a Modul
router.put('/:id', modulController.updateModul);

// Delete a Modul
router.delete('/:id', modulController.deleteModul);

module.exports = router;
