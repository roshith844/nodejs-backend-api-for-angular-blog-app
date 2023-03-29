const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const verifyTokenMiddleware = require('../../middlewares/user/verifyToken')
const upload = require("../../middlewares/multer")
const { tryCatch } = require('../../utils/try-catch')

router.get('/details', verifyTokenMiddleware.verifyUser, tryCatch(profileController.getProfile))
router.patch('/edit', verifyTokenMiddleware.verifyUser, tryCatch(profileController.editProfile))
router.post('/upload/profile-image', verifyTokenMiddleware.verifyUser, tryCatch(upload.single("image"), profileController.editProfileImage))

module.exports = router