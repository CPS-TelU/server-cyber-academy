const taskService = require('../services/taskService');

const postTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = await taskService.addTask({ title, description });
        return res.status(201).json({
            message: "Task added successfully",
            task: newTask,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const allTasks = await taskService.getAllTasks();
        return res.status(200).json({
            tasks: allTasks,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getTaskByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await taskService.getTaskById(Number(id));
        return res.status(200).json({
            task: task,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

const getTaskPage = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.render('tasks', { 
            taskList: tasks,
            title: 'Task Upload' 
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    postTask,
    getTasks,
    getTaskByIdController,
    getTaskPage,
};
