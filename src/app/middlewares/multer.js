const multer = require("multer");
const path = require("path");

// Define storage settings
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Ensure correct path resolution using __dirname and path.join
    const destinationPath = path.join(__dirname, "../public/images");
    callback(null, destinationPath);
  },
  filename: (req, file, callback) => {
    // Log the file details for debugging
    // Generate a unique filename using Date.now() and the file extension
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

// Create upload middleware
const uploadProfilePicture = multer({ storage: storage });

module.exports = uploadProfilePicture;
