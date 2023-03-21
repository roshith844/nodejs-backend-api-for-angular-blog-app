const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './../public/images')
    },
    filename: (req, file, callback) => {
        console.log(file)
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

// upload.single("image")
// puton data enctype="multipart/form-data"   
// tyoe file name image
const uploadProfilePicture = multer({ storage: storage })
module.exports = uploadProfilePicture

// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//      destination: (req, file,callback)=>{
//           callback(null, './public/images/')
//      },
//      filename: (req, file, callback)=>{
//           callback(null, new Date().toISOString() +'-' +  file.originalname )
//      }
// })

// // File Validation
// const fileFilter = (req, file, callback)=>{
//     if(file.mimetype == 'image/jpeg' || file.mimetype == file.mimetype == 'image/png'  ){
//         callback(null, true)
//     }else{
//         // Prevents Upload
//         callback({message: 'Unsupported File Format'}, false)

//     }
// }

// // upload.single("image")
// // puton data enctype="multipart/form-data"
// // tyoe file name image
// const upload = multer({storage: storage, limits: {fileSize: 1024* 1024}, fileFilter: fileFilter })
// module.exports= upload