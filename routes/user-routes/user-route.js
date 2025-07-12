const express = require("express");
const {
  getUsers,
  getUserById,
} = require("../../controllers/user-controllers/user-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = express.Router();

router.get("/get-users", authMiddleware, getUsers);
router.get("/get-users/:id", authMiddleware, getUserById);

module.exports = router;
