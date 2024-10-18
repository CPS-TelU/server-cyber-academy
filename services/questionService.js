const imagekit = require("../libs/imageKit.js");
const questionRepository = require("../repository/questionRepository.js");

const createQuestion = async (messages, file, user_id, topic_id) => {
  try {
    let image = null;
    if (file) {
      const imageUpload = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "question",
      });
      image = imageUpload.url;
    }
    const questionData = {
      messages,
      image,
      user_id,
      topic_id,
    };
    return await questionRepository.createQuestion(questionData);
  } catch (error) {
    console.error("Error in createQuestion service: ", error);
    throw new Error("Failed to create question");
  }
};
const updatedQuestion = async (id, messages, files) => {
  try {
    const existingQuestion = await questionRepository.getQuestionById(id);
    if (!existingQuestion) {
      throw new Error("Question not found");
    }
    let imageUrl = existingQuestion.image;
    if (files) {
      const imageUpload = await imagekit.upload({
        file: files.buffer,
        fileName: files.originalname,
        folder: "question",
      });
      imageUrl = imageUpload.url;
    }
    const questionData = {
      messages: messages,
      image: imageUrl,
    };
    return await questionRepository.updateQuestion(id, questionData);
  } catch (error) {
    console.error("Error in updatedQuestion service: ", error);
    throw new Error("Failed to update question");
  }
};
const getQuestionById = async (id) => {
  return questionRepository.getQuestionById(id);
};
const getQuestionsByTopicId = async (topic_id) => {
  return questionRepository.getQuestionsByTopicId(topic_id);
};
const deletedQuestion = async (id) => {
  return questionRepository.deleteQuestion(id);
};
const getQuestions = async () => {
  return questionRepository.getQuestions();
};
module.exports = {
  createQuestion,
  updatedQuestion,
  getQuestionById,
  getQuestionsByTopicId,
  deletedQuestion,
  getQuestions,
};
