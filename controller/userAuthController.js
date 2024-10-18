const nodemailer = require("../libs/nodemailer");
const {
  registerUserService,
  loginUserService,
  logoutUserService,
} = require("../services/userAuthService");

const registerUserController = async (req, res) => {
  try {
    const user = await registerUserService(
      req.body.name,
      req.body.nim,
      req.body.className,
      req.body.email,
      req.body.noHp,
      req.body.gender,
      req.body.faculty,
      req.body.year,
      req.body.major,
      req.body.document,
      req.body.github
    );

    const registrationSendEmail = async () => {
      try {
        const html = await nodemailer.getHTML("registration.ejs", {
          name: req.body.name,
        });

        await nodemailer.sendMail(req.body.email, "Registration", html);
        return true;
      } catch (err) {
        console.error("Failed to send registration email:", err.message);
        return false;
      }
    };

    const emailSent = await registrationSendEmail();
    if (!emailSent) {
      throw new Error("Failed to send email");
    }

    const { password, ...userWithoutPassword } = user;

    return res.status(201).json({
      status: true,
      message: `Account created, and email sent to ${req.body.email}`,
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const login = await loginUserService(req.body.nim, req.body.password);

    res.status(200).json(login);
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const logoutUserController = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];

  const result = await logoutUserService(token);

  if (result.success) {
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: result.message,
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
