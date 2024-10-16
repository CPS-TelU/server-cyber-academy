const userService = require("../services/userService");

const changePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const numbId = parseInt(id);
    const { oldPassword, newPassword } = req.body;

    const updatedUser = await userService.changePassword(
      numbId,
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

const sendResetPasswordEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    await userService.forgotPassword(email);
    return res.status(200).json({
      status: true,
      message: "Email berhasil dikirim",
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
    const { email, token, newPassword } = req.body;

    await userService.resetPassword(email, token, newPassword);
    return res.status(200).json({
      status: true,
      message: "Password berhasil direset",
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

module.exports = {
  changePasswordController,
  sendResetPasswordEmailController,
  resetPasswordController,
};
