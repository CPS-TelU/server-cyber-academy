// groupService.js
const groupRepository = require('../repository/groupRepository');
// groupService.js

async function createGroup(groupName) {
    if (!groupName) throw new Error('Group name is required');
    return await groupRepository.createGroup(groupName);
  }
  
  async function deleteGroup(groupId) {
    if (!groupId) throw new Error('Group ID is required');
    return await groupRepository.deleteGroup(groupId);
  }
  
  async function assignUserToGroup(userIds, groupId) {
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw new Error('User IDs are required and should be an array');
    }
    if (!groupId) throw new Error('Group ID is required');
    return await groupRepository.assignUserToGroup(userIds, groupId);
}
  
  async function unassignUserFromGroup(userId, groupId) {
    if (!userId || !groupId) throw new Error('Both userId and groupId are required');
    return await groupRepository.unassignUserFromGroup(userId, groupId);
  }
  
  module.exports = {
    createGroup,
    deleteGroup,
    assignUserToGroup,
    unassignUserFromGroup,
  };