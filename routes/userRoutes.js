const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const accessValidation = require("../middleware/userAuthMiddleware");

router.put("/change-password/:id", userController.changePasswordController);
router.post(
  "/forgot-password",
  userController.sendResetPasswordEmailController
);
router.post("/reset-password", userController.resetPasswordController);
router.get("/whoami", accessValidation, userController.whoamiController)

module.exports = router;
