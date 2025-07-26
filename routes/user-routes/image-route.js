const {
  uplaodImage,
  fethAllImages,
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

router.get(
  "/fetch",
  fethAllImages
)

module.exports = router;
