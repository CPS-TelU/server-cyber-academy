const express = require("express");
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByTopicId,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questionController.js");
const upload = require("../middleware/mutler.js");
const router = express.Router();

// Menggunakan upload untuk menerima file
router.post("/question", upload.single("image"), createQuestion);
router.put("/question/:id", upload.single("image"), updateQuestion);
router.get("/questions", getQuestions);
router.get("/question/:id", getQuestionById);
router.get("/questions/:topicId", getQuestionsByTopicId);
router.delete("/question/:id", deleteQuestion);

module.exports = router;