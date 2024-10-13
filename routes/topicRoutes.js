const express = require("express");
const {
  createTopic,
  getTopics,
  getTopicById,
} = require("../controller/topicController.js");

const router = express.Router();

// Define the routes without repeating the base path
router.post("/", createTopic);          // POST /api/topics/
router.get("/", getTopics);             // GET /api/topics/
router.get("/:id", getTopicById);       // GET /api/topics/:id

module.exports = router;
