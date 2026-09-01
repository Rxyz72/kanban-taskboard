const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User Register
router.post("/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        if (!firstname || !lastname || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all the fields" });
        }

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({ message: "User already exisits" });
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
        });

        const token = generateToken(user._id);

        // register route
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all the fields" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        // login route
        res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Currently logged in User info
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = router;
