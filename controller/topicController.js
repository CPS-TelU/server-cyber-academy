const topicService = require("../services/topicService.js");

const createTopic = async (req, res) => {
  try {
    const topic = await topicService.createTopic(req.body); // Make sure req.body contains { title, userId }
    res.status(201).json({
      success: true,
      message: "Topic created successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTopics = async (req, res) => {
  try {
    const topics = await topicService.getTopics();
    res.status(200).json({
      success: true,
      message: "Topics retrieved successfully",
      data: topics,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopicById = async (req, res) => {
  try {
    const topic = await topicService.getTopicById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Topic retrieved successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTopic, getTopics, getTopicById };
