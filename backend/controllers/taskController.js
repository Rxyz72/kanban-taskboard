const Task = require("../models/Task");
const Team = require("../models/Team");

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            assignee,
            category,
            priority,
            status,
            deadline,
            attachments,
            team,
        } = req.body;

        const task = await Task.create({
            title,
            description,
            assignee,
            createdBy: req.user._id,
            category,
            priority,
            status,
            deadline,
            attachments,
            team,
        });

        const populatedTask = await Task.findById(task._id)
            .populate("assignee", "firstname lastname")
            .populate("createdBy", "firstname lastname");

        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasksByTeam = async (req, res) => {
    try {
        const { teamId } = req.params;

        const tasks = await Task.find({ team: teamId })
            .populate("assignee", "firstname lastname")
            .populate("createdBy", "firstname lastname");

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.status = status;
        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate("assignee", "firstname lastname")
            .populate("createdBy", "firstname lastname");

        res.status(200).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// full edit — only the team leader can do this
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, assignee, category, priority, status, deadline } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const team = await Team.findById(task.team);

        if (team.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the team leader can edit tasks" });
        }

        task.title = title;
        task.description = description;
        task.assignee = assignee;
        task.category = category;
        task.priority = priority;
        task.status = status;
        task.deadline = deadline;

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate("assignee", "firstname lastname")
            .populate("createdBy", "firstname lastname");

        res.status(200).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete — only the team leader can do this
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const team = await Team.findById(task.team);

        if (team.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the team leader can delete tasks" });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasksByTeam, updateTaskStatus, updateTask, deleteTask };