const express = require('express')
const router = express.Router()
const CommentManagementController = require('./../../controllers/admin/comment-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/all', verifyTokenMiddleware.verifyAdmin, CommentManagementController.getComments)
router.patch('/remove', verifyTokenMiddleware.verifyAdmin, CommentManagementController.removeUserComment)

module.exports = router