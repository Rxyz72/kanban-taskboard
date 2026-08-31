const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res
                .status(401)
                .json({ message: "Not authorized, Token failed" });
        }
    }

    return res.status(401).json({
        message: "Not authorized, no token"
    });
};

module.exports = { protect };
// Authorization: [Bearer <Token>]
