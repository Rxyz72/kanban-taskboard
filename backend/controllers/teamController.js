const Team = require("../models/Team");
const User = require("../models/User");

// Create Team
const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Team name is required",
            });
        }

        const team = await Team.create({
            name,
            description,
            createdBy: req.user._id,

            members: [
                {
                    user: req.user._id,
                    role: "Team Leader",
                    title: "Team Leader",
                    status: "Active",
                },
            ],
        });

        const populatedTeam = await Team.findById(team._id)
            .populate("createdBy", "firstname lastname")
            .populate("members.user", "firstname lastname email");

        res.status(201).json(populatedTeam);

        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Add Member
const addMember = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { userId, role, title, status } = req.body;

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // only the team creator can add members
        if (team.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the team leader can add members" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const alreadyMember = team.members.some(
            (member) => member.user.toString() === userId,
        );

        if (alreadyMember) {
            return res.status(400).json({ message: "User is already a member" });
        }

        team.members.push({ user: userId, role, title, status });

        await team.save();

        const populatedTeam = await Team.findById(team._id)
            .populate("createdBy", "firstname lastname")
            .populate("members.user", "firstname lastname email");

        res.status(200).json(populatedTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyTeam = async (req, res) => {
    try {
        const team = await Team.findOne({
            "members.user": req.user._id,
        })
            .populate("createdBy", "firstname lastname")
            .populate("members.user", "firstname lastname email");

        if (!team) {
            return res.status(404).json({
                message: "User is not a member of any team",
            });
        }

        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateMember = async (req, res) => {
    try {
        const { teamId, userId } = req.params;
        const { role, title, status } = req.body;

        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        // only the team creator can edit members
        if (team.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the team leader can edit members" });
        }

        const member = team.members.find(
            (m) => m.user.toString() === userId,
        );

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        member.role = role;
        member.title = title;
        member.status = status;

        await team.save();

        const populatedTeam = await Team.findById(team._id)
            .populate("createdBy", "firstname lastname")
            .populate("members.user", "firstname lastname email");

        res.status(200).json(populatedTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTeam,
    addMember,
    getMyTeam,
    updateMember, 
};

