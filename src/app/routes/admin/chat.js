const express = require('express')
const router = express.Router()
const chatController = require('./../../controllers/admin/chat-controller')
const verifyToken = require('./../../middlewares/token/verify-token')
router.post('/',verifyToken.verifyAdmin, chatController.sendMessage)
router.get('/:id',verifyToken.verifyAdmin, chatController.getChatMessages)
router.patch('/read', verifyToken.verifyAdmin, chatController.markAsRead)

module.exports = router