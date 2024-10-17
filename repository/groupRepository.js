const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class GroupRepository {
  // Create a new group
  async createGroup(groupName) {
    return await prisma.group.create({
      data: {
        groupName,
      },
    });
  }

  // Delete a group
  async deleteGroup(groupId) {
    return await prisma.group.delete({
      where: { id: Number(groupId) },
    });
  }

  // Assign a user to a group
 async assignUserToGroup(userIds, groupId) {
        try {
            return await prisma.group.update({
                where: {
                    id: Number(groupId),
                },
                data: {
                    users: {
                        connect: userIds.map(userId => ({ id: Number(userId) })), // Ensure the format
                    },
                },
                include: {
                    users: true, // Include users in the response
                },
            });
        } catch (error) {
            console.error('Error assigning users to group:', error);
            throw new Error('Could not assign users to group');
        }
    }


  // Unassign a user from a group
  async unassignUserFromGroup(userId, groupId) {
    return await prisma.group.update({
      where: {
        id: Number(groupId), // Ensure groupId is a number
      },
      data: {
        users: { // Change from User to users
          disconnect: {
            id: Number(userId), // Ensure userId is a number
          },
        },
      },
    });
  }
}

module.exports = new GroupRepository();
