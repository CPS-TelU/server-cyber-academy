const prisma = require("../config/db.js");
const getQuestions = async () => {
  return await prisma.questions.findMany();
};

const createQuestion = async (questionData) => {
  return await prisma.questions.create({
    data: {
      messages: questionData.messages,
      image: questionData.image,
      topicId: questionData.topicId,
      userId: questionData.userId,
    },
  });
};

const updateQuestion = async (id, questions) => {
  return await prisma.questions.update({
    where: { id: parseInt(id) },
    data: questions,
  });
};

const deleteQuestion = async (id) => {
  return await prisma.questions.delete({
    where: { id: parseInt(id) },
  });
};
const getQuestionById = async (id) => {
  return await prisma.questions.findUnique({
    where: { id: parseInt(id) },
  });
};
const getQuestionsByTopicId = async (topicId) => {
  return await prisma.questions.findMany({
    where: {
      topicId: parseInt(topicId),
    },
  });
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionsByTopicId,
  updateQuestion,
  deleteQuestion,
};