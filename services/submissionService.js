// services/submissionService.js
const submissionRepository = require('../repository/submissionRepository');

async function createSubmission({ file, userId, groupId, taskId, adminId }) {
    return await submissionRepository.createSubmission({ file, userId, groupId, taskId, adminId });
}

// Delete a submission by ID
async function deleteSubmission(submissionId) {
    return await submissionRepository.deleteSubmission(submissionId);
}

module.exports = {
    createSubmission,
    deleteSubmission, // Export the new deleteSubmission function
};
