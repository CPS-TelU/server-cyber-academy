const topicRepository = require("../repository/topicRepository.js");
const createTopic = async (topicData) => {
  return topicRepository.createTopic(topicData);
};
const getTopics = async () => {
  return topicRepository.getTopics();
};
const getTopicById = async (id) => {
  const topic = await topicRepository.getTopicById(id);
  if (!topic) {
    throw new Error("Topic not found");
  }
  return topic;
};
module.exports = {
  createAnswer,
  updatedAnswer,
  getAnswers,
  findAnswerByQuestionId,
};
