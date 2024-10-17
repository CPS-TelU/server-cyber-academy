const prisma = require("../config/db.js");

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const updateUserById = async (id, user) => {
  const updatedUser = await prisma.users.update({
    where: {
      id: id,
    },
    data: user,
  });
  return updatedUser;
};

const getUserByemail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

module.exports = {
  getUserById,
  updateUserById,
  getUserByemail,
};
