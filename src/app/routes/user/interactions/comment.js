const express = require('express')
const router = express.Router()
const commentController = require('./../../../controllers/user/interactions/commentController')
const verifyTokenMiddleware = require('./../../../middlewares/user/verifyToken')

router.post('/add', verifyTokenMiddleware.verifyUser, commentController.addComment)
router.get('/get/:id', commentController.getAllComments)

module.exports = router