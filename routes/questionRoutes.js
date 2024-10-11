const {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByTopicId,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questionController.js");

const discussion = () => {
  const router = express.Router();
  router.post("/question", createQuestion);
  router.get("/questions", getQuestions);
  router.get("/question/:id", getQuestionById);
  router.get("/questions/:topicId", getQuestionsByTopicId);
  router.put("/question/:id", updateQuestion);
  router.delete("/question/:id", deleteQuestion);
  return router;
};

module.exports = discussion;
