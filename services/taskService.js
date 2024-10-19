const taskRepository = require('../repository/taskRepository');

let tasks = [];

const addTask = (title, description) => {
    if (!title || typeof title !== 'string') {
        throw new Error('Invalid title');
    }
    if (!description || typeof description !== 'string') {
        throw new Error('Invalid description');
    }

    const newTask = { 
        id: tasks.length + 1, // Assign an ID to each task
        title, 
        description, 
        status: 'pending' // Default status
    };

    tasks.push(newTask);
    return newTask;
};

const getAllTasks = () => {
    return tasks;
};

const getTaskById = (id) => {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

const getTaskList = async () => {
    const tasks = await taskRepository.findAllTasks();
    return tasks;
  };

module.exports = {
    addTask,
    getAllTasks,
    getTaskById,
    getTaskList
};
