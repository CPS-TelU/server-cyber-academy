const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const accessValidation = require("../middleware/userAuthMiddleware");
const {
  getAllQuestionController,
  createQuestionController,
  createAnswerController,
} = require("../controller/discussionController");

router.post(
  "/",
  accessValidation,
  upload.single("image"),
  createQuestionController
);
router.get("/", getAllQuestionController);
router.post(
  "/answers",
  accessValidation,
  upload.single("image"),
  createAnswerController
);

module.exports = router;
