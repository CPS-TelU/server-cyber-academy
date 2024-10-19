const groupService = require('../services/groupService');

async function createGroup(req, res) {
    try {
        const { groupName } = req.body;
        const group = await groupService.createGroup(groupName);
        // Convert BigInt to string for serialization
        res.status(201).json({
            ...group,
            id: group.id.toString() // Convert id to string
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create group", error: error.message });
    }
}

async function deleteGroup(req, res) {
    try {
        const groupId = parseInt(req.params.id);
        await groupService.deleteGroup(groupId);
        res.status(200).json({
            success: true,
            message: "Group has been deleted successfully." // Convert id to string if necessary
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete group", error: error.message });
    }
}

async function assignUserToGroup(req, res) {
    try {
        const { users } = req.body; // Expecting an array of user IDs
        const groupId = parseInt(req.params.groupId);
        
        // Validate input
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: "Invalid input: users must be an array of user IDs." });
        }

        // Call the service to assign users to the group
        const updatedGroup = await groupService.assignUserToGroup(users, groupId);

        // Check if the group was successfully updated
        if (!updatedGroup) {
            return res.status(404).json({ message: "Group not found or users could not be assigned." });
        }

        // Return a successful response
        res.status(200).json({
            success: true,
            message: "Users have been assigned to the group successfully.",
            data: updatedGroup, // Include the updated group data
            id: updatedGroup.id.toString() // Convert id to string if necessary
        });
    } catch (error) {
        console.error("Error assigning users to group:", error); // Log the error for debugging
        res.status(500).json({ message: "Failed to assign users to group", error: error.message });
    }
}


async function unassignUserFromGroup(req, res) {
    try {
        const { userId } = req.body;
        const groupId = parseInt(req.params.groupId);
        const updatedGroup = await groupService.unassignUserFromGroup(userId, groupId);
        // Convert BigInt to string for serialization
        res.status(200).json({
            ...updatedGroup,
            id: updatedGroup.id.toString() // Convert id to string
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to unassign user from group", error: error.message });
    }
}       

module.exports = {
    createGroup,
    deleteGroup,
    assignUserToGroup,
    unassignUserFromGroup,
};
