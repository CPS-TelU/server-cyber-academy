const topicService = require("../services/topicService.js");

const createTopic = async (req, res) => {
  try {
    const topic = await topicService.createTopic(req.body);
    res.status(201).json(topic, { message: "Topic created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTopics = async (req, res) => {
  try {
    const topics = await topicService.getTopics();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTopicById = async (req, res) => {
  try {
    const topic = await topicService.getTopicById(req.params.id);
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTopic, getTopics, getTopicById };