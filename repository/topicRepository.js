const prisma = require("../config/db.js");

const createTopic = async (topic) => {
  if (!topic.title || !topic.userId) {
    throw new Error("Title and userId are required fields.");
  }
  const userExists = await prisma.user.findUnique({
    where: { id: topic.userId },
  });

  if (!userExists) {
    throw new Error("Invalid userId: User does not exist.");
  }

  // Membuat topik dengan userId yang diberikan
  return await prisma.topic.create({
    data: {
      title: topic.title,
      userId: topic.userId,
    },
  });
};

const getTopics = async () => {
  return await prisma.topic.findMany();
};

const getTopicById = async (id) => {
  return await prisma.topic.findUnique({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
};