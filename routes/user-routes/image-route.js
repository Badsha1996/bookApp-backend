const {
  uplaodImage,
} = require("../../controllers/user-controllers/image-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const express = require("express");

const router = express.Router();

router.post("/upload", authMiddleware, uplaodImage);

module.exports = router;
