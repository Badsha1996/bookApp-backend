const {
  uplaodImage,
} = require("../../controllers/user-controllers/image-controller");
const authMiddleware = require("../../middlewares/auth-middleware");
const express = require("express");
const uploadMiddleware = require("../../middlewares/upload-middleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("image"),
  uplaodImage
);

module.exports = router;
