const prisma = require("../config/db.js");

const findAllTasks = async () => {
    return await prisma.task.findMany();
  };

module.exports = {
    findAllTasks,
};