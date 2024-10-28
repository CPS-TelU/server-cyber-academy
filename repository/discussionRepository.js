const prisma = require("../config/db");

const createQuestion = async (questionData) => {
  const question = await prisma.question.create({
    data: questionData,
    include: {
      User: {
        select: {
          name: true,
        },
      },
    },
  });

  return question;
};

const getAllQuestions = async (topicId) => {
  let questions;

  if (topicId) {
    questions = await prisma.question.findMany({
      where: { topic_id: topicId },
      include: {
        User: {
          select: {
            name: true,
          },
        },
        Topic: true,
        answers: {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } else {
    questions = await prisma.question.findMany({
      include: {
        User: {
          select: {
            name: true,
          },
        },
        Topic: true,
        answers: {
          include: {
            User: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  return questions;
};

const createAnswer = async (answerData) => {
  const answer = await prisma.answer.create({
    data: answerData,
    include: {
      User: {
        select: {
          name: true,
        },
      },
    },
  });

  return answer;
};

module.exports = {
  createQuestion,
  getAllQuestions,
  createAnswer,
};
