const cloudinary = require("../config/cloudinaryConfig.js");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Something went wrong in uplaodToCloudinary func");
    throw new Error("Something went wrong during upload");
  }
};

module.exports = {
  uploadToCloudinary,
};
