const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({});

module.exports = mongoose.model("Book", BookSchema);
