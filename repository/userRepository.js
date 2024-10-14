const prisma = require("../config/db.js");

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const updateUserById = async (id, user) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: user,
  });
  return updatedUser;
};

module.exports = {
  getUserById,
  updateUserById,
};
