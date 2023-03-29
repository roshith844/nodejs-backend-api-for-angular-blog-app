const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const chatController = require('./../../controllers/admin/chat-controller')
const verifyToken = require('./../../middlewares/token/verify-token')
router.post('/', verifyToken.verifyAdmin, tryCatch(chatController.sendMessage))
router.get('/:id', verifyToken.verifyAdmin, tryCatch(chatController.getChatMessages))
router.patch('/read', verifyToken.verifyAdmin, tryCatch(chatController.markAsRead))

module.exports = router