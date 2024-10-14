const answerService = require("../services/answerService.js");

const createAnswer = async (req, res) => {
  try {
    const { message } = req.body;
    const files = req.files;
    const answer = await answerService.createAnswer(message, files);
    res.status(201).json({
      success: true,
      message: "Answer created successfully",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create answer",
      error: error.message,
    });
  }
};

const updatedAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const files = req.files;
    const answer = await answerService.updatedAnswer(id, message, files);
    res.status(200).json({
      success: true,
      message: "Answer updated successfully",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update answer",
      error: error.message,
    });
  }
};

const getAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAnswers();
    res.status(200).json({
      success: true,
      message: "Answers retrieved successfully",
      data: answers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve answers",
      error: error.message,
    });
  }
};

const findAnswerByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answer = await answerService.findAnswerByQuestionId(questionId);
    res.status(200).json({
      success: true,
      message: "Answer retrieved successfully",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve answer",
      error: error.message,
    });
  }
};
module.exports = {
  createAnswer,
  updatedAnswer,
  getAnswers,
  findAnswerByQuestionId,
};