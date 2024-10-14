const prisma = require("../config/db.js");

const createQuestion = async (question) => {
  const newQuestion = await prisma.questions.create({
    data: question,
  });
  return newQuestion;
};
const getQuestions = async () => {
  const questions = await prisma.questions.findMany();
  return questions;
};
const getQuestionById = async (id) => {
  const question = await prisma.questions.findUnique({
    where: {
      id: id,
    },
  });
  return question;
};
const getQuestionsByTopicId = async (topicId) => {
  const questions = await prisma.questions.findMany({
    where: {
      topicId: topicId,
    },
  });
  return questions;
};
const updateQuestion = async (id, question) => {
  const updatedQuestion = await prisma.questions.update({
    where: {
      id: id,
    },
    data: question,
  });
  return updatedQuestion;
};
const deleteQuestion = async (id) => {
  const deletedQuestion = await prisma.questions.delete({
    where: {
      id: id,
    },
  });
  return deletedQuestion;
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByTopicId,
  updateQuestion,
  deleteQuestion,
};