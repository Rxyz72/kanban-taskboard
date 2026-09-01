const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            title: {
                    type: String,
                    required: true,
            },
            status: {
                type: String,
                required: true,
            }
        }
    ],
}, {
    timestamps: true
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;