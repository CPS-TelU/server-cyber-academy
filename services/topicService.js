const topicRepository = require("../repository/topicRepository.js");
const createTopic = async (topic) => {
  const newTopic = await topicRepository.createTopic(topic);
  return newTopic;
};
const getTopics = async () => {
  const topics = await topicRepository.getTopics();
  return topics;
};
const getTopicById = async (id) => {
  const topic = await topicRepository.getTopicById(id);
  return topic;
};
module.exports = {
  createTopic,
  getTopics,
  getTopicById,
};