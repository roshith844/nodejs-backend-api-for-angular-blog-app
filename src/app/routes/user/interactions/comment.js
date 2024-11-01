const express = require('express')
const { tryCatch } = require('../../../utils/try-catch')
const router = express.Router()
const commentController = require('./../../../controllers/user/interactions/commentController')
const verifyTokenMiddleware = require('./../../../middlewares/token/verify-token')

router.post('/add', verifyTokenMiddleware.verifyUser, tryCatch(commentController.addComment))
router.get('/get/:id', tryCatch(commentController.getAllComments))
router.delete('/blogId/:blogId/comment/:commentId', verifyTokenMiddleware.verifyUser, tryCatch(commentController.deleteComment))

module.exports = router