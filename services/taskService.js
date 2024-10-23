const taskRepository = require('../repository/taskRepository');

async function addTask({ title, description }) {
    if (!title || typeof title !== 'string') {
        throw new Error('Invalid title');
    }
    if (!description || typeof description !== 'string') {
        throw new Error('Invalid description');
    }

    const newTask = { 
        title, 
        description, 
        status: 'pending' // Default status
    };

    return await taskRepository.createTask(newTask); // Assuming you have a createTask method in the repository
}

async function getAllTasks() {
    return await taskRepository.findAllTasks();
}

async function getTaskById(id) {
    const task = await taskRepository.findTaskById(id); // Assuming you have a findTaskById method in the repository
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
}

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
};
