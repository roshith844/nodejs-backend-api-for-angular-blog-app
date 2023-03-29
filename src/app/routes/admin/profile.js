const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/admin/profile-controller')
const verifyTokenMiddleware = require('../../middlewares/user/verifyToken')
const upload = require("../../middlewares/multer")
const { tryCatch } = require('../../utils/try-catch')

router.get('/details', verifyTokenMiddleware.verifyAdmin, tryCatch(profileController.getProfile))
router.patch('/edit', verifyTokenMiddleware.verifyAdmin, tryCatch(profileController.editProfile))
router.post('/upload/profile-image', verifyTokenMiddleware.verifyAdmin, tryCatch(upload.single("image"), profileController.editProfileImage))

module.exports = router
