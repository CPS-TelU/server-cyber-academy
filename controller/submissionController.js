// controllers/submissionController.js
const submissionService = require('../services/submissionService');

async function createSubmission(req, res) {
    try {
        // Directly set userId for testing
        const userId = 1; // Hardcoded user ID for testing
        const { file, groupId, taskId, adminId } = req.body;

        // Log the extracted data
        console.log("Request Data:", { file, userId, groupId, taskId, adminId });

        // Create the submission
        const newSubmission = await submissionService.createSubmission({ file, userId, groupId, taskId, adminId });

        // Broadcast the new submission to other members in the group (if using Socket.io)
        req.io.emit('newSubmission', newSubmission); // Make sure req.io is passed in middleware

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Submission created successfully',
            data: newSubmission,
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error occurred:", error); 
        res.status(500).json({ message: 'Failed to create submission', error: error.message });
    }
}

// Delete a submission by ID
async function deleteSubmission(req, res) {
    try {
        const { id } = req.params; // Get submission ID from request parameters

        // Call the service to delete the submission
        await submissionService.deleteSubmission(id);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Submission deleted successfully',
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error occurred:", error); 
        res.status(500).json({ message: 'Failed to delete submission', error: error.message });
    }
}

module.exports = {
    createSubmission,
    deleteSubmission, // Export the new deleteSubmission function
};
