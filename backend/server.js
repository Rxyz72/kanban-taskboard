const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const { connectDB } = require('./config/db');
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/tasks", taskRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`))

