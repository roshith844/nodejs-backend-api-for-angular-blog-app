const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const postManagementController = require('./../../controllers/admin/post-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/all', verifyTokenMiddleware.verifyAdmin, tryCatch(postManagementController.getPosts))
router.get('/get/:id', verifyTokenMiddleware.verifyAdmin, tryCatch(postManagementController.getPost))
router.patch('/approve', verifyTokenMiddleware.verifyAdmin, tryCatch(postManagementController.approveBlog))
router.patch('/reject', verifyTokenMiddleware.verifyAdmin, tryCatch(postManagementController.rejecteBlog))

module.exports = router