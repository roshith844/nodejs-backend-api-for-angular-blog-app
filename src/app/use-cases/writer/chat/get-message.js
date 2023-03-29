const { getAllMessagesFromDatabase } = require("../../../data-access/writer/chat-service")

async function getAllMessages(blogId) {
    if (!blogId) return false
    const RESPONSE = await getAllMessagesFromDatabase(blogId)
    return !RESPONSE ? false : RESPONSE
}

module.exports = { getAllMessages }