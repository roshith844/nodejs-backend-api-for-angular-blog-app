const express = require('express')
const router = express.Router()
const creatorManagementController = require('./../../controllers/admin/creator-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

// router.patch('/block', verifyTokenMiddleware.verifyAdmin, userManagementController.blockUser)
// router.patch('/unblock', verifyTokenMiddleware.verifyAdmin, userManagementController.unBlockUser)

router.get('/all', verifyTokenMiddleware.verifyAdmin, creatorManagementController.getCreatorsData)

module.exports = router