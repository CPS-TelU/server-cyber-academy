const moduleService = require('../services/moduleService');

const postModule = (req, res) => {
    const { module } = req.body;

    try {
        const newModule = moduleService.addModule(module);
        return res.status(201).json({
            message: "Module added successfully",
            module: newModule,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getModules = (req, res) => {
    const allModules = moduleService.getAllModules();
    return res.status(200).json({
        modules: allModules,
    });
};

module.exports = {
    postModule,
    getModules,
};
