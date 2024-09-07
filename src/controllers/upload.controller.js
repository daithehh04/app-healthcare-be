require("dotenv").config();
const cloudinary = require("../config/cloudinary");
class UploadController {
  static handleUploadImage = async (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      { upload_preset: process.env.UPLOAD_PRESET || "ml_default" },
      function (err, result) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Uploaded!",
          data: result.url,
        });
      }
    );
  };
}

module.exports = UploadController;
