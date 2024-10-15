const express = require("express");
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByTopicId,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questionController.js");
const upload = require("../middleware/multer.js");
const router = express.Router();

router.post("/question", upload.single("image"), createQuestion);
router.put("/question/:id", upload.single("image"), updateQuestion);
router.get("/questions", getQuestions);
router.get("/question/:id", getQuestionById);
router.get("/questions/:topicId", getQuestionsByTopicId);
router.delete("/question/:id", deleteQuestion);

module.exports = router;
