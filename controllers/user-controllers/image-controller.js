const Image = require("../../models/Image");
const { uploadToCloudinary } = require("../../utils/cloudinaryUtil");
const fs = require("fs");
const uplaodImage = async (req, res) => {
  try {
    // IF User do not have any files
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // UPLOAD TO MONGODB
    const uploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Image has been uploaded successfully",
      image: uploadedImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong during uplaod",
      error: error,
    });
  }
};

const fethAllImages = async (req, res) => {
  try {
    // we will fetch it from mongoose
    const images = await Image.find();

    if (!images) {
      res.status(400).json({
        success: false,
        message: "Unable to find any image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image has been fetched successfully",
      images: images,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "something went wrong. Unable to fetch Images",
      error: error,
    });
  }
};

module.exports = {
  uplaodImage,
  fethAllImages
};
