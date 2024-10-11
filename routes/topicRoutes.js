const {
  createTopic,
  getTopics,
  getTopicById,
} = require("../controller/topicController.js");

const discussion = () => {
  const router = express.Router();
  router.post("/topic", createTopic);
  router.get("/topics", getTopics);
  router.get("/topic/:id", getTopicById);
  return router;
};

module.exports = {
  discussion,
};
