const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require("dotenv").config();

cloudinary.config({
  cloud_name: "djqtjud43",
  api_key: "922299427472538",
  api_secret: "OJ9Hq0AksEsHioduIHbO2VxoI6E",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogApp",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const multer = require("multer");
const fileFilter = (req, file, cb) => {
  if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    return cb(new Error("File is not an image"));
  }
  return cb(null, true);
};

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } , fileFilter});

module.exports = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.log(err)

      return res.send({ err: "Selected file is not an image" });
    }
    return next();
  });
};