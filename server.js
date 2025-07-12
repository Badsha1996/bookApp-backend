const express = require("express");
const env = require("dotenv");
const connectDB = require("./database/mongoDB");
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-routes/user-route");
const adminUserRoutes = require("./routes/admin-routes/user-route");

// Initialization
const app = express();
env.config();
connectDB();

// middleware for json epress
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT} 👍`);
});
