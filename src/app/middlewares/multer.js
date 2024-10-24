// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './../public/images')
//     },
//     filename: (req, file, callback) => {
//         console.log(file)
//         callback(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const uploadProfilePicture = multer({ storage: storage })
// module.exports = uploadProfilePicture
const multer = require('multer');
const path = require('path');

// Define storage settings
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Ensure correct path resolution using __dirname and path.join
        const destinationPath = path.join(__dirname, '../public/images');
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        // Log the file details for debugging
        console.log(file);
        // Generate a unique filename using Date.now() and the file extension
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

// Create upload middleware
const uploadProfilePicture = multer({ storage: storage });

module.exports = uploadProfilePicture;
