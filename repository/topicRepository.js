const prisma = require("../config/db.js");

const createTopic = async (topicData) => {
  if (!topicData.title || !topicData.user_id) {
    throw new Error("Title and userId are required fields.");
  }
  const userExists = await prisma.user.findUnique({
    where: { id: topicData.user_id },
  });
  if (!userExists) {
    throw new Error("Invalid user_id: User does not exist.");
  }
  return await prisma.topic.create({
    data: {
      title: topicData.title,
      user_id: topicData.user_id,
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
