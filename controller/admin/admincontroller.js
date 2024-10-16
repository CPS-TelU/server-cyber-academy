const { registerAdminService, loginAdminService, logoutAdminService } = require("../../services/admin/adminService");

const registerAdminController = async (req, res) => {
    try {
        const register = await registerAdminService(
            req.body.username, 
            req.body.password,
            req.body.name,
        );
        res.status(200).json(register);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const loginAdminController = async (req, res) => {
    try {
      const login = await loginAdminService(req.body.username, req.body.password);
      res.status(200).json(login);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  };

  const logoutAdminController = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({message: "No token provided"});
    }

    const token = authorization.split(" ")[1];

    const result = await logoutAdminService(token);

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

module.exports = { registerAdminController, loginAdminController, logoutAdminController };