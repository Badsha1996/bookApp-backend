const express = require("express");
const authMiddleware = require("../../middlewares/auth-middleware");
const adminMiddleware = require("../../middlewares/admin-middleware");
const {
  getUserById,
  getUsers,
} = require("../../controllers/admin-controllers/user-controller");

const router = express.Router();

router.get("/get-users", authMiddleware, adminMiddleware, getUsers);
router.get("/get-users/:id", authMiddleware, adminMiddleware, getUserById);

module.exports = router;
