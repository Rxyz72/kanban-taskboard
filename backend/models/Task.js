const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    attachments: {
        type: Array,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;