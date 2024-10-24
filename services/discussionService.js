const discussionRepository = require("../repository/discussionRepository");
const imagekit = require("../libs/imageKit.js");
const path = require("path");

const getAllQuestions = async (topicId) => {
  const questions = await discussionRepository.getAllQuestions(topicId);

  return questions;
};

const createQuestion = async (messages, image, user_id, topic_id) => {
  if (!messages || !user_id || !topic_id) {
    throw new Error(
      "Please provide all required fields (messages, user_id, topic_id)"
    );
  }

  let fileUrl = null;

  if (image) {
    const fileBase64 = image.buffer.toString("base64");

    const response = await imagekit.upload({
      fileName: Date.now() + path.extname(image.originalname),
      file: fileBase64,
      folder: "CyberAcademy/Questions",
    });

    fileUrl = response.url;
  }

  const questionData = {
    messages,
    image: fileUrl,
    user_id,
    topic_id,
  };

  const question = await discussionRepository.createQuestion(questionData);

  return question;
};

const createAnswer = async (messages, image, user_id, question_id) => {
  if (!messages || !user_id || !question_id) {
    throw new Error(
      "Please provide all required fields (messages, user_id, question_id)"
    );
  }

  let fileUrl = null;

  if (image) {
    const fileBase64 = image.buffer.toString("base64");

    const response = await imagekit.upload({
      fileName: Date.now() + path.extname(image.originalname),
      file: fileBase64,
      folder: "CyberAcademy/Answers",
    });

    fileUrl = response.url;
  }

  const answerData = {
    messages,
    image: fileUrl,
    user_id,
    question_id,
  };

  const answer = await discussionRepository.createAnswer(answerData);

  return answer;
};

module.exports = {
  getAllQuestions,
  createQuestion,
  createAnswer,
};
