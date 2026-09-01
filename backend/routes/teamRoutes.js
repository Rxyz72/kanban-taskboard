const express = require("express");

const {
    createTeam,
    addMember,
    getMyTeam,
    updateMember,
} = require("../controllers/teamController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createTeam);

router.post("/:teamId/members", protect, addMember);

router.get("/my-team", protect, getMyTeam);

router.patch("/:teamId/members/:userId", protect, updateMember);

module.exports = router;