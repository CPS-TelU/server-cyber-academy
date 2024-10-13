const prisma = require("../config/db.js");

const getAnswers = async () => {
  const answers = await prisma.answers.findMany();
  return answers;
};
const createAnswer = async (answer) => {
  const newAnswer = await prisma.answers.create({
    data: answer,
  });
  return newAnswer;
};
const updateAnswer = async (id, answer) => {
  const updatedAnswer = await prisma.answers.update({
    where: {
      id: id,
    },
    data: answer,
  });
  return updatedAnswer;
};
const findAnswerByQuestionId = async (questionId) => {
  const answer = await prisma.answers.findMany({
    where: {
      questionId: questionId,
    },
  });
  return answer;
};

module.exports = {
  getAnswers,
  createAnswer,
  updateAnswer,
  findAnswerByQuestionId,
};
