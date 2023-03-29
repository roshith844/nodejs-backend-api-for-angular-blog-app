const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const CommentManagementController = require('./../../controllers/admin/comment-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/all', verifyTokenMiddleware.verifyAdmin, tryCatch(CommentManagementController.getComments))
router.patch('/remove', verifyTokenMiddleware.verifyAdmin, tryCatch(CommentManagementController.removeUserComment))

module.exports = router