const express = require("express");
const {
  createAnswer,
  updateAnswer,
  getAnswers,
  findAnswerByQuestionId,
} = require("../controller/answerController.js");
const upload = require("../middleware/multer.js");

const router = express.Router();
router.post("/answer", upload.single("image"), createAnswer);
router.put("/answer/:id", upload.single("image"), updateAnswer);
router.get("/answers", getAnswers);
router.get("/answer/:id", findAnswerByQuestionId);

module.exports = router;
