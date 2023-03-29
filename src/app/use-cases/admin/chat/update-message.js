const { updateMessageAsReadOnDatabase } = require("../../../data-access/admin/chat-service")

async function updateMessageAsRead(blogId) {
    if (!blogId) return false
    if (await updateMessageAsReadOnDatabase(blogId) === true) return true
    return false
}

module.exports = { updateMessageAsRead }