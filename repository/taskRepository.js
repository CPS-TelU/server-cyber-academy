const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TaskRepository {
    // Fetch all tasks
    async findAllTasks() {
        return await prisma.task.findMany();
    }

    async findTaskById(id) {
      return await prisma.task.findUnique({
        where: {
          id: id,
        },
      });
    }
}

module.exports = new TaskRepository();
