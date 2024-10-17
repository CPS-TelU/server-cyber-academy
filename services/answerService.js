const answerRepository = require("../repository/answerRepository.js");
const imagekit = require("../libs/imagekit.js");

const createAnswer = async (messages, file, user_id, question_id) => {
  try {
    let image = null;
    if (file) {
      const imageUpload = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "answer",
      });
      image = imageUpload.url;
    }
    const answerData = {
      messages,
      image,
      user_id,
      question_id,
    };
    return await answerRepository.createAnswer(answerData);
  } catch (error) {
    console.error("Error in createAnswer service: ", error);
    throw new Error("Failed to create answer");
  }
};

const updatedAnswer = async (id, messages, file) => {
  try {
    const existingAnswer = await answerRepository.findAnswerById(id);
    if (!existingAnswer) {
      throw new Error("Answer not found");
    }
    let imageUrl = existingAnswer.image;
    if (file) {
      const imageUpload = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "answer",
      });
      imageUrl = imageUpload.url;
    }
    const answerData = {
      messages,
      image: imageUrl,
    };
    return await answerRepository.updateAnswer(id, answerData);
  } catch (error) {
    console.error("Error in updatedAnswer service: ", error);
    throw new Error("Failed to update answer");
  }
};

const findAnswerByQuestionId = async (question_id) => {
  try {
    return await answerRepository.findAnswerByQuestionId(question_id);
  } catch (error) {
    console.error("Error in findAnswerByQuestionId service: ", error);
    throw new Error("Failed to find answer by question ID");
  }
};

const getAnswers = async () => {
  try {
    return await answerRepository.getAnswers();
  } catch (error) {
    console.error("Error in getAnswers service: ", error);
    throw new Error("Failed to get answers");
  }
};

module.exports = {
  createAnswer,
  updatedAnswer,
  findAnswerByQuestionId,
  getAnswers,
};
