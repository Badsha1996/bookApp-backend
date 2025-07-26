const express = require("express");
const {
  login,
  register,
  changePassword,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
