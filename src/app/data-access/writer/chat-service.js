const CHAT_SCHEMA = require('./../../models/admin-writer-chat-schema')
async function addWriterMessageToDatabase(blogId, message, authorId, Id) {

    const DOC = await CHAT_SCHEMA.create({
        blogId: blogId,
        sender: 'admin',
        receiver: authorId,
        type: 'writer-to-admin',
        content: message
    })
    const RESPONSE = await DOC.save()
    if (RESPONSE) return true
    return false
}

async function getAllMessagesFromDatabase(blogId) {
    const RESPONSE = await CHAT_SCHEMA.find({ blogId: blogId })
    return !RESPONSE ? false : RESPONSE.length === 0 ? false : RESPONSE
}

async function markAsAllMessagesRead(blogId) {
    const RESPONSE = await CHAT_SCHEMA.updateMany({ blogId: blogId }, { is_read: true })
    return !RESPONSE ? false : RESPONSE.acknowledged == true ? true : false
}

module.exports = {
    addWriterMessageToDatabase, getAllMessagesFromDatabase, markAsAllMessagesRead
}


