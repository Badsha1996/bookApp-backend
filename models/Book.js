const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book Title is required"],
    trim: true,
    minlength: [2, "Minimum of two characters are required"],
    maxlength: [100, "Maximum of 100 characters are allowed"],
  },
});

module.exports = mongoose.model("Book", BookSchema);
