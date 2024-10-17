const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.put("/change-password/:id", userController.changePasswordController);
router.post(
  "/forgot-password",
  userController.sendResetPasswordEmailController
);
router.post("/reset-password", userController.resetPasswordController);

module.exports = router;
