const express = require('express')
const router = express.Router()
const commentController = require('./../../../controllers/user/interactions/commentController')
const verifyTokenMiddleware = require('./../../../middlewares/user/verifyToken')

router.post('/add', verifyTokenMiddleware.verifyUser, commentController.addComment)

module.exports = router