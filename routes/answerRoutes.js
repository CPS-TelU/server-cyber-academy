const {
  createAnswer,
  updatedAnswer,
  getAnswers,
  findAnswerByQuestionId,
} = require("../controller/answerController.js");

const discussion = () => {
  const router = express.Router();
  router.post("/answer", createAnswer);
  router.put("/answer/:id", updatedAnswer);
  router.get("/answers", getAnswers);
  router.get("/answer/:id", findAnswerByQuestionId);
  return router;
};
module.exports = discussion;
