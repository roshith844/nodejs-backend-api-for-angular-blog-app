const express = require('express')
const router = express.Router()
const postManagementController = require('./../../controllers/admin/post-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/all', verifyTokenMiddleware.verifyAdmin, postManagementController.getPosts)
router.patch('/approve', verifyTokenMiddleware.verifyAdmin, postManagementController.approveBlog)
router.patch('/reject', verifyTokenMiddleware.verifyAdmin, postManagementController.rejecteBlog)

module.exports = router