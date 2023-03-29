const { updateMessageAsRead } = require("../../use-cases/admin/chat/update-message")
const { isArticleIdExists } = require("../../use-cases/validation/validate-id")
const { getAllMessages } = require("../../use-cases/writer/chat/get-message")
const { sendMessageToAdmin } = require("../../use-cases/writer/chat/send-message")
const { updateMessagesByWriterAsRead } = require("../../use-cases/writer/chat/update-message")

module.exports = {
    sendMessage: async (req, res) => {
        const WRITER_ID = req.user
        const { blogId, message, author } = req.body

        if (!(await isArticleIdExists(blogId))) return res.json({ "success": false, "message": "blog doesn't exist" })
        if (await sendMessageToAdmin(blogId, message, author, WRITER_ID) === true) return res.json({ success: true })
        res.json({ "success": false, "message": 'message not send' })
    },
    getChatMessages: async (req, res) => {
        const BLOG_ID = req.params.id
        const ALL_CHAT_MESSAGES = await getAllMessages(BLOG_ID)
        if (!ALL_CHAT_MESSAGES) return res.json({ "success": false })
        res.json({ "success": true, "data": ALL_CHAT_MESSAGES })
    },
    markAsRead: async (req, res) => {
        const { blogId } = req.body
        if (await updateMessagesByWriterAsRead(blogId) === true) {
            res.json({ "success": true })
        } else {
            res.json({ "success": true })
        }
    }
}