const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "Minimum of two characters are required"],
      maxlength: [100, "Maximum of 100 characters are allowed"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Minimum of two characters are required"],
      maxlength: [100, "Maximum of 100 characters are allowed"],
    },
    userName: {
      type: String,
      unique: true,
      //   required: [true, "Username is required"],
      trim: true,
      minlength: [2, "Minimum of two characters are required"],
      maxlength: [100, "Maximum of 100 characters are allowed"],
    },
    age: {
      type: Number,
      min: 0,
      max: 300,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    permission: {
      type: String,
      enum: ["author", "reader"],
      default: "reader",
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Before saving the userschema we can run a middleware
UserSchema.pre("save", async function (next) {
  if (!this.userName) {
    const uuid = crypto.randomUUID().split("-")[0];
    const first = this.firstName?.toLowerCase() || "user";
    const last = this.lastName?.toLowerCase() || "random";
    this.userName = `${first}.${last}@${uuid}`;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
