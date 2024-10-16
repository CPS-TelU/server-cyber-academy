const express = require("express");
const {
  createTopic,
  getTopics,
  getTopicById,
} = require("../controller/topicController.js");
const router = express.Router();
router.post("/topic", createTopic);
router.get("/topics", getTopics);
router.get("/topic/:id", getTopicById);

module.exports = router;
