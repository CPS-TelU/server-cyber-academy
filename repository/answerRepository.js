const prisma = require("../config/db.js");

const getAnswers = async () => {
  return await prisma.answer.findMany();
};

const createAnswer = async (answerData) => {
  return await prisma.answer.create({
    data: {
      messages: answerData.message,
      image: answerData.image,
      user_id: answerData.userId,
      question_id: answerData.questionId,
    },
  });
};

const updateAnswer = async (id, answer) => {
  return await prisma.answer.update({
    where: { id: parseInt(id) },
    data: answer,
  });
};
const findAnswerByQuestionId = async (question_id) => {
  return await prisma.answer.findMany({
    where: {
      question_id: question_id,
    },
  });
};

module.exports = {
  getAnswers,
  createAnswer,
  updateAnswer,
  findAnswerByQuestionId,
};
