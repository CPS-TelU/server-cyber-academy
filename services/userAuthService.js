const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  registerUser,
  getUserByNim,
  blacklistToken,
  getUserByEmail,
} = require("../repository/userAuthRepository");

const registerUserService = async (
  name,
  nim,
  className,
  email,
  noHp,
  gender,
  faculty,
  year,
  major,
  document,
  github
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Format email tidak valid.");
  }

  const existingUserByNIM = await getUserByNim(nim);
  if (existingUserByNIM) {
    throw new Error("NIM sudah terdaftar.");
  }

  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error("Email sudah terdaftar.");
  }

  const rawPassword = nim + "ca2024";

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const user = await registerUser(
    name,
    nim,
    className,
    email,
    noHp,
    gender,
    faculty,
    year,
    major,
    hashedPassword,
    document,
    github
  );

  return user;
};

const loginUserService = async (nim, password) => {
  if (!nim || !password) {
    throw new Error("NIM dan password harus diisi");
  }

  const user = await getUserByNim(nim);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Kredensial tidak valid");
  }

  const payload = { id: user.id, name: user.name };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  return {
    status: true,
    message: "Login berhasil",
    payload,
    token,
  };
};

const logoutUserService = async (token) => {
  try {
    await blacklistToken(token);
    return { success: true, message: "Logout successful." };
  } catch (error) {
    return { success: false, message: "An error occurred during logout." };
  }
};

module.exports = { registerUserService, loginUserService, logoutUserService };
