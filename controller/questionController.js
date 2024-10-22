const questionService = require("../services/questionService.js");
const createQuestion = async (req, res) => {
  try {
    const { messages, topic_id, user_id } = req.body;
    const file = req.file;
    //debugging API
    console.log("Message: ", messages);
    console.log("User ID: ", user_id);
    console.log("Topic ID: ", topic_id);
    console.log("File: ", file);
    if (!messages || !user_id || !topic_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const question = await questionService.createQuestion(
      messages,
      file,
      user_id,
      topic_id
    );
    req.io.emit(`new-question-${topic_id}`, question);
    return res.status(201).json({
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
    const { messages } = req.body;
    const file = req.file;
    const updatedQuestion = await questionService.updateQuestion(
      id,
      messages,
      file
    );
    req.io.emit(`update-question-${id}`, updatedQuestion);
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};
const getQuestions = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    req.io.emit("new-question", questions);
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error in getQuestions: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    if (!question) {
      console.log("Question not found");
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    req.io.emit(`update-question-${id}`, question);
    res.status(200).json({
      success: true,
      message: "Question retrieved successfully",
      data: question,
    });
  } catch (error) {
    console.error("Error in getQuestionById: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve question",
      error: error.message,
    });
  }
};
const getQuestionsByTopicId = async (req, res) => {
  try {
    const { topic_id } = req.params;
    // Pengecekan jika topic_id tidak ada atau kosong
    if (!topic_id) {
      return res.status(400).json({
        success: false,
        message: "topic_id is required",
      });
    }
    const questions = await questionService.getQuestionsByTopicId(topic_id);
    req.io.emit(`new-question-${topic_id}`, questions);
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error in getQuestionsByTopicId: ", error);
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
    await questionService.deleteQuestion(id);
    const io = req.app.get("io");
    io.emit("Question successfully deleted", id);
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
module.exports = {
  createQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionsByTopicId,
  deleteQuestion,
  getQuestions,
};
