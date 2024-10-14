const answerRepository = require("../repository/answerRepository.js");

const createAnswer = async (message, file) => {
  const imageUploads = await Promise.all(
    file.map((file) => {
      return imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "answer",
      });
    })
  );
  const images = [];
  imageUploads.forEach((upload, index) => {
    images[`image_${index}`] = upload.url;
  });
  const answer = {
    message,
    image: images,
  };
  return answerRepository.createAnswer(answer);
};
const updatedAnswer = async (id, message, file) => {
  const imageUploads = await Promise.all(
    file.map((file) => {
      return imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "answer",
      });
    })
  );
  const images = [];
  imageUploads.forEach((upload, index) => {
    images[`image_${index}`] = upload.url;
  });
  const answer = {
    message,
    image: images,
  };
  return answerRepository.updateAnswer(id, answer);
};
const findAnswerByQuestionId = async (questionId) => {
  const answer = await answerRepository.findAnswerByQuestionId(questionId);
  return answer;
};
const getAnswers = async () => {
  const answers = await answerRepository.getAnswers();
  return answers;
};
module.exports = {
  createAnswer,
  updatedAnswer,
  findAnswerByQuestionId,
  getAnswers,
};