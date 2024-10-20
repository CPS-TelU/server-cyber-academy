const userService = require("../services/userService");
const nodemailer = require("../libs/nodemailer");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const changePasswordController = async (req, res) => {
  try {
    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const updatedUser = await userService.changePassword(
      id,
      oldPassword,
      newPassword
    );

    return res.status(200).json({
      status: true,
      message: "Password berhasil diperbarui",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const sendForgotPasswordEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
        data: null,
      });
    }

    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/user/reset-password?token=${token}`;

    const html = await nodemailer.getHTML("forgotPassword.ejs", {
      name: user.name,
      url: url,
    });

    await nodemailer.sendMail(email, "Reset Password", html);

    return res.status(200).json({
      status: true,
      message: "Email forgot password successfully sent",
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Password fields cannot be empty",
        data: null,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      const updatedUser = await userService.resetPassword(
        decoded.email,
        token,
        password,
        confirmPassword
      );

      return res.status(200).json({
        status: true,
        message: "Password successfully updated",
        data: updatedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const resetPasswordPage = async (req, res, next) => {
  try {
    let { token } = req.query;
    res.render("resetPassword.ejs", {
      token,
      layout: false,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const whoamiController = async (req, res) => {
  try {
    const user = await userService.whoamiService(req.user.id);

    res.status(200).json({
      status: true,
      message: "Data pengguna berhasil diambil",
      data: user,
    });
  } catch (error) {
    console.error("Error saat mengambil data pengguna:", error);
    res.status(401).json({
      status: false,
      message: error.message || "Tidak diizinkan",
      data: null,
    });
  }
};

module.exports = {
  changePasswordController,
  sendForgotPasswordEmailController,
  whoamiController,
  resetPasswordController,
  resetPasswordPage,
};
