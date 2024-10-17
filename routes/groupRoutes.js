// groupRoutes.js
const express = require('express');
const {
    createGroup,
    deleteGroup,
    assignUserToGroup,
    unassignUserFromGroup,
} = require('../controller/groupController');

const router = express.Router();

// Create a group
router.post('/create', createGroup);

// Delete a group
router.delete('/delete/:id', deleteGroup);

// Assign a user to a group
router.post('/assign/:groupId/users', assignUserToGroup);

// Unassign a user from a group
router.delete('/unassign/:groupId/users', unassignUserFromGroup);

module.exports = router;
