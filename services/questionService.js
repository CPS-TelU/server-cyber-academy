const questionRepository = require("../repository/questionRepository.js");

const createQuestion = async (message, files) => {
  const imageUploads = await Promise.all(
    files.map((file) => {
      return imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "question",
      });
    })
  );
  const images = {};
  imageUploads.forEach((upload, index) => {
    images[`image_${index}`] = upload.url;
  });
  const question = {
    messages: message,
    image: images,
  };
  return questionRepository.createQuestion(question);
};

const updatedQuestion = async (id, message, files) => {
  const imageUploads = await Promise.all(
    files.map((file) => {
      return imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "question",
      });
    })
  );
  const images = {};
  imageUploads.forEach((upload, index) => {
    images[`image_${index}`] = upload.url;
  });
  const question = {
    messages: message,
    image: images,
  };
  return questionRepository.updateQuestion(id, question);
};

const getQuestionById = async (id) => {
  return questionRepository.getQuestionById(id);
};

const getQuestionsByTopicId = async (topicId) => {
  return questionRepository.getQuestionsByTopicId(topicId);
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