const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const chatController = require('./../../controllers/writer/chat-controller')
const verifyToken = require('./../../middlewares/token/verify-token')
router.post('/', verifyToken.verifyWriter, tryCatch(chatController.sendMessage))
router.get('/:id', verifyToken.verifyWriter, tryCatch(chatController.getChatMessages))
router.patch('/read', verifyToken.verifyWriter, tryCatch(chatController.markAsRead))

module.exports = router