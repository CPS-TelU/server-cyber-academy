const discussionService = require("../services/discussionService.js");
const { io } = require("../app");

const getAllQuestionController = async (req, res) => {
  try {
    const { topicId } = req.query;
    const questions = await discussionService.getAllQuestions(topicId);

    return res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while retrieving questions",
      error: error.message,
    });
  }
};

const createQuestionController = async (req, res) => {
  try {
    const { messages, topic_id } = req.body;
    const user_id = req.user.id;
    const image = req.file;

    if (!messages || !topic_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (messages, topic_id)",
        data: null,
      });
    }

    const question = await discussionService.createQuestion(
      messages,
      image,
      user_id,
      topic_id
    );

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "An error occurred while creating the question",
        data: null,
      });
    }

    // io.emit("newQuestion", { topic_id, question });
    req.io.emit("newQuestion", question);

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the question",
      data: null,
    });
  }
};

const createAnswerController = async (req, res) => {
  try {
    const { messages, question_id } = req.body;
    const user_id = req.user.id;
    const image = req.file;

    const answer = await discussionService.createAnswer(
      messages,
      image,
      user_id,
      question_id
    );

    if (!answer) {
      return res.status(400).json({
        success: false,
        message: "An error occurred while creating the answer",
        data: null,
      });
    }

    io.emit("newAnswer", { question_id, answer });

    return res.status(201).json({
      success: true,
      message: "Answer created successfully",
      data: answer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the answer",
      data: null,
    });
  }
};

module.exports = {
  getAllQuestionController,
  createQuestionController,
  createAnswerController,
};
