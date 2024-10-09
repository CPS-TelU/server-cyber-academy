const prisma = require("../config/db");

const createTopic = async (topic) => {
  const newTopic = await prisma.topic.create({
    data: topic,
  });
  return newTopic;
};

const getTopics = async () => {
  const topics = await prisma.topic.findMany();
  return topics;
};

const getTopicById = async (id) => {
  const topic = await prisma.topic.findUnique({
    where: {
      id: id,
    },
  });
  return topic;
};

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
};
