const express = require("express");
const {
    createTask,
    getTasksByTeam,
    updateTaskStatus,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/team/:teamId", protect, getTasksByTeam);
router.patch("/:id/status", protect, updateTaskStatus);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;