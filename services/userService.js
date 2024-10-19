const bcrypt = require("bcrypt");
const userRepository = require("../repository/userRepository");
const nodemailer = require("../libs/nodemailer");

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

const sendResetPasswordEmail = async (email, token) => {
  const html = await nodemailer.getHTML("reset-password.ejs", {
    token,
  });

  await nodemailer.sendMail(email, "Reset Password", html);
};

const forgotPassword = async (email) => {
  const user = await userRepository.getUserByemail(email);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const token = await bcrypt.hash(email, 10);
  await sendResetPasswordEmail(email, token);

  return user;
};

const resetPassword = async (email, token, newPassword) => {
  const user = await userRepository.getUserByemail(email);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isTokenMatch = await bcrypt.compare(email, token);
  if (!isTokenMatch) {
    throw new Error("Token salah");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userRepository.updateUserById(user.id, {
    password: hashedPassword,
  });
  return updatedUser;
};

const whoamiService = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user
}

module.exports = {
  changePassword,
  sendResetPasswordEmail,
  forgotPassword,
  resetPassword,
  whoamiService
};
