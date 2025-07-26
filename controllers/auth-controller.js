const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // fetch the data from user
    const { firstName, lastName, email, password, role, permission, age } =
      req.body;

    // basic validation
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All required feilds are mandatory",
      });
    }

    // checke if the user is already register
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "This user already exist. Please try to login",
      });
    }

    // hased the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save the user
    const createdUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user",
      permission: permission || "reader",
      age: age,
    });

    const savedUser = await createdUser.save();

    if (savedUser) {
      res.status(200).json({
        success: true,
        message: `New User has been created with userName - ${createdUser.userName}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "something went wrong during user creation",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    // basic check
    if (!email && !userName) {
      res.status(400).json({
        success: false,
        message: "Please provide email or userName",
      });
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: "Please provide a password",
      });
    }

    // Is this user exist
    const user = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid userName or email",
      });
    }

    // password check
    const isCorrectPassowrd = await bcrypt.compare(password, user.password);

    if (!isCorrectPassowrd) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
        permission: user.permission,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age || 0,
        userName: user.userName,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // whos password are we changing
    const userId = req.userInfo.userId;
    const { newPassword, oldPassword } = req.body;

    // if user did not give naything
    if (!newPassword || !oldPassword) {
      return res.status(400).json({
        success: false,
        message: "newpassword and oldpassword are required",
      });
    }

    // If user type same password twise
    if (newPassword === oldPassword) {
      return res.status(400).json({
        success: false,
        message: "newpassword and oldpassword can not be same",
      });
    }

    // Now i want the actual user data of that ID 😸
    const user = await User.findById(userId);

    // if user did not type oldpassword correct
    const isCorrectPassowrd = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassowrd) {
      res.status(400).json({
        success: false,
        message: `You have entered the wrong password`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // save the new password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Password has been changed`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

module.exports = { register, login, changePassword };
