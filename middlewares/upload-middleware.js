const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now + path.extname(file.originalname));
  },
});

const checkFileType = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image file"));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkFileType,
  limits: 10 * 1024 * 1024,
});
