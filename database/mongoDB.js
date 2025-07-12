const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database has been connected successfully 🥇");
  } catch (error) {
    console.error("something went wrong while connecting to MongoDB");
    throw new Error(`caused by mongo ${error}`);
  }
}

module.exports = connectDB;
