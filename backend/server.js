const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const { connectDB } = require('./config/db');
const taskRoutes = require("./routes/taskRoutes");
const teamRoutes = require("./routes/teamRoutes");

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();


app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`))

