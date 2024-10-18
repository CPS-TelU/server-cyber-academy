// routes/submissionRoutes.js
const express = require('express');
const { createSubmission, deleteSubmission } = require('../controller/submissionController'); // Updated to import deleteSubmission

const router = express.Router();

// Create a submission without authentication middleware
router.post('/create', createSubmission);

// Delete a submission by ID
router.delete('/:id', deleteSubmission); // Added route for deleting a submission

module.exports = router;
