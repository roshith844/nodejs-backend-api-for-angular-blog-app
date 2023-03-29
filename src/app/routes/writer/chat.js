const express = require('express')
const router = express.Router()
const chatController = require('./../../controllers/writer/chat-controller')
const verifyToken = require('./../../middlewares/token/verify-token')
router.post('/', verifyToken.verifyWriter, chatController.sendMessage)
router.get('/:id', verifyToken.verifyWriter, chatController.getChatMessages)
router.patch('/read', verifyToken.verifyWriter, chatController.markAsRead)

module.exports = router