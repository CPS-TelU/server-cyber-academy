const prisma = require("../config/db.js");

const getAnswers = async () => {
  return await prisma.answer.findMany();
};

const createAnswer = async (answerData) => {
  return await prisma.answer.create({
    data: {
      messages: answerData.message,
      image: answerData.image,
      userId: answerData.userId,
      questionId: answerData.questionId,
    },
  });
};

const updateAnswer = async (id, answer) => {
  return await prisma.answer.update({
    where: { id: parseInt(id) },
    data: answer,
  });
};
const findAnswerByQuestionId = async (questionId) => {
  return await prisma.answer.findMany({
    where: {
      questionId: questionId,
    },
  });
};

module.exports = {
  getAnswers,
  createAnswer,
  updateAnswer,
  findAnswerByQuestionId,
};