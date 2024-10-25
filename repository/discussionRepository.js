const prisma = require("../config/db");

const createQuestion = async (questionData) => {
  const question = await prisma.question.create({
    data: questionData,
  });

  return question;
};

const getAllQuestions = async (topicId) => {
  if (topicId) {
    questions = await prisma.question.findMany({
      where: { topic_id: topicId },
      include: {
        User: true,
        Topic: true,
        answers: true,
      },
    });
  } else {
    questions = await prisma.question.findMany({
      include: {
        User: true,
        Topic: true,
        answers: true,
      },
    });
  }

  return questions;
};

const createAnswer = async (answerData) => {
  const answer = await prisma.answer.create({
    data: answerData,
  });

  return answer;
};

module.exports = {
  createQuestion,
  getAllQuestions,
  createAnswer,
};
