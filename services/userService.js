const bcrypt = require("bcrypt");
const userRepository = require("../repository/userRepository");

const changePassword = async (id, oldPassword, newPassword) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password lama salah");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userRepository.updateUserById(id, {
    password: hashedPassword,
  });
  return updatedUser;
};

module.exports = {
  changePassword,
};
