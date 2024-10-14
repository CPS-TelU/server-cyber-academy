const questionService = require("../services/questionService.js");

const createQuestion = async (req, res) => {
  try {
    const { message } = req.body;
    const files = req.files;
    const question = await questionService.createQuestion(message, files);
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create question",
      error: error.message,
    });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const files = req.files;
    const question = await questionService.updatedQuestion(id, message, files);
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Question retrieved successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve question",
      error: error.message,
    });
  }
};
const getQuestionsByTopicId = async (req, res) => {
  try {
    const { topicId } = req.params;
    const questions = await questionService.getQuestionsByTopicId(topicId);
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await questionService.deletedQuestion(id);
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};
const getQuestions = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
module.exports = {
  createQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionsByTopicId,
  deleteQuestion,
  getQuestions,
};