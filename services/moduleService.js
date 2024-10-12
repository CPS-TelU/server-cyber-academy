let modules = [];

const addModule = (moduleName) => {
    if (!moduleName || typeof moduleName !== 'string') {
        throw new Error('Invalid module name');
    }
    modules.push(moduleName);
    return moduleName;
};

const getAllModules = () => {
    return modules;
};

module.exports = {
    addModule,
    getAllModules,
};
