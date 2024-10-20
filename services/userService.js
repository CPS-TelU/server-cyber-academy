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

  delete updatedUser.password;

  return updatedUser;
};

const resetPassword = async (email, token, password, confirmPassword) => {
  const user = await userRepository.getUserByemail(email);
  if (!user) {
    throw new Error("User not found");
  }

  if (!token) {
    throw new Error("Invalid token");
  }

  if (!password || !confirmPassword) {
    throw new Error("Password fields cannot be empty");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await userRepository.updateUserByEmail(email, {
    password: hashedPassword,
  });

  delete updatedUser.password;

  return updatedUser;
};

const whoamiService = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  delete user.password;

  return user;
};

const getUserByEmail = async (email) => {
  const user = await userRepository.getUserByemail(email);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

module.exports = {
  changePassword,
  resetPassword,
  whoamiService,
  getUserByEmail,
};
