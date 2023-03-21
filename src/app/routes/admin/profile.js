const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/admin/profile-controller')
const verifyTokenMiddleware = require('../../middlewares/user/verifyToken')
const upload = require("../../middlewares/multer")

router.get('/details', verifyTokenMiddleware.verifyAdmin, profileController.getProfile)
router.patch('/edit', verifyTokenMiddleware.verifyAdmin, profileController.editProfile)
router.post('/upload/profile-image', verifyTokenMiddleware.verifyAdmin, upload.single("image"), profileController.editProfileImage)

module.exports = router
