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

const getUserByemail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

const findAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      groups: true, // Memuat relasi groups
    },
  });
};

module.exports = {
  getUserById,
  updateUserById,
  getUserByemail,
  findAllUsers,
};
