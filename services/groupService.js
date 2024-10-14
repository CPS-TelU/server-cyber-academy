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
  
  async function assignUserToGroup(userId, groupId) {
    if (!userId || !groupId) throw new Error('Both userId and groupId are required');
    return await groupRepository.assignUserToGroup(userId, groupId);
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