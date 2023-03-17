const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const verifyTokenMiddleware = require('../../middlewares/user/verifyToken')
// const uploadImage = require("../../middlewares/user/cloudinary")
const upload = require("../../middlewares/multer")

router.get('/details', verifyTokenMiddleware.verifyUser, profileController.getProfile)
router.patch('/edit', verifyTokenMiddleware.verifyUser, profileController.editProfile)
router.post('/upload/profile-image', verifyTokenMiddleware.verifyUser, profileController.editProfileImage)

module.exports = router