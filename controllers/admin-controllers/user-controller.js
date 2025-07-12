const User = require("../../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      res.status(200).json({
        success: true,
        message: "There are no users",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users list has been fethched",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User with id ${userId} has been fethed`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
