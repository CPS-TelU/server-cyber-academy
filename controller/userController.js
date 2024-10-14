const userService = require("../services/userService");

const changePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = {
  changePasswordController,
};
