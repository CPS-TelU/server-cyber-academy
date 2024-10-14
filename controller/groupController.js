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
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete group", error: error.message });
    }
}

async function assignUserToGroup(req, res) {
    try {
        const { users } = req.body;
        const groupId = parseInt(req.params.groupId);
        const updatedGroup = await groupService.assignUserToGroup(users, groupId);
        // Convert BigInt to string for serialization
        res.status(200).json({
            success: true,
            message: "A user has been assigned",
            data: group,
            ...updatedGroup,
            id: updatedGroup.id.toString() // Convert id to string
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to assign user to group", error: error.message });
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
