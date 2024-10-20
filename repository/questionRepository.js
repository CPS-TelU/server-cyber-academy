const prisma = require("../config/db.js");
const getQuestions = async () => {
  return await prisma.question.findMany();
};

const createQuestion = async (questionData) => {
  try {
    return await prisma.question.create({
      data: {
        messages: questionData.messages,
        image: questionData.image,
        topic_id: questionData.topic_id,
        user_id: parseInt(questionData.user_id),
      },
    });
  } catch (error) {
    console.error("Error creating question in repository: ", error);
    throw new Error("Failed to create question in repository");
  }
};

const updateQuestion = async (id, questions) => {
  return await prisma.question.update({
    where: { id: parseInt(id) },
    data: questions,
  });
};

const deleteQuestion = async (id) => {
  return await prisma.question.delete({
    where: { id: String(id) },
  });
};
const getQuestionById = async (id) => {
  return await prisma.question.findUnique({
    where: { id: String(id) },
  });
};
const getQuestionsByTopicId = async (topic_id) => {
  return await prisma.question.findMany({
    where: {
      topicId: parseInt(topic_id),
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
