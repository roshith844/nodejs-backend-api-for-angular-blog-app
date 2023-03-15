const express = require('express')
const router = express.Router()
const userManagementController = require('./../../controllers/admin/user-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.patch('/block', verifyTokenMiddleware.verifyAdmin, userManagementController.blockUser)

module.exports = router