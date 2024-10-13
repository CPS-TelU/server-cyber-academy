const { registerUserService, loginUserService, logoutUserService } = require("../services/userAuthService");

const registerUserController = async (req, res) => {
    try {
        const register = await registerUserService(
            req.body.name, 
            req.body.nim, 
            req.body.email, 
            req.body.noHp, 
            req.body.gender, 
            req.body.faculty, 
            req.body.year, 
            req.body.major,
            req.body.password
        );
        res.status(200).json(register);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const loginUserController = async (req, res) => {
    try {
      const login = await loginUserService(req.body.nim, req.body.password);
      res.status(200).json(login);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  };

  const logoutUserController = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({message: "No token provided"});
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

module.exports = { registerUserController, loginUserController, logoutUserController };