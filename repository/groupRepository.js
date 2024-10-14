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
  async assignUserToGroup(userId, groupId) {
    return await prisma.group.update({
      where: {
        id: Number(groupId),
      },
      data: {
        User: {
          connect: {
            id: Number(userId),
          },
        },
      },
    });
  }

  // Unassign a user from a group
  async unassignUserFromGroup(userId, groupId) {
    return await prisma.group.update({
      where: {
        id: Number(groupId),
      },
      data: {
        User: {
          disconnect: {
            id: Number(userId),
          },
        },
      },
    });
  }
}

module.exports = new GroupRepository();
