const prisma = require("../config/db.js");

const getAnswers = async () => {
  return await prisma.answer.findMany();
};

const createAnswer = async (answerData) => {
  try {
    return await prisma.answer.create({
      data: {
        messages: answerData.messages,
        image: answerData.image,
        user_id: parseInt(answerData.user_id, 10),
        question_id: answerData.question_id,
      },
    });
  } catch (error) {
    console.error("Error creating answer in repository: ", error);
    throw new Error("Failed to create answer in repository");
  }
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
