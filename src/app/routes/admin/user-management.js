const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const userManagementController = require('./../../controllers/admin/user-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/token/verify-token')

router.patch('/block', verifyTokenMiddleware.verifyAdmin, tryCatch(userManagementController.blockUser))
router.patch('/unblock', verifyTokenMiddleware.verifyAdmin, tryCatch(userManagementController.unBlockUser))

router.get('/all', verifyTokenMiddleware.verifyAdmin, tryCatch(userManagementController.getUserData))

module.exports = router