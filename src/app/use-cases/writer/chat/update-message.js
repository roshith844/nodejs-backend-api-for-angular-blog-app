
const {  updateMessageByWriterAsReadOnDatabase } = require("../../../data-access/admin/chat-service")

async function updateMessagesByWriterAsRead(blogId) {
    if (!blogId) return false
    if (await updateMessageByWriterAsReadOnDatabase(blogId) === true) return true
    return false
}

module.exports = { updateMessagesByWriterAsRead }