const CHAT_SCHEMA = require('./../../models/admin-writer-chat-schema')
async function addAdminMessageToDatabase(blogId, message, authorId, adminId) {

    const DOC = await CHAT_SCHEMA.create({
        blogId: blogId,
        sender: adminId,
        receiver: authorId,
        type: 'admin-to-writer',
        content: message
    })
    const RESPONSE = await DOC.save()
    if (RESPONSE) return true
    return false
}

async function updateMessageAsReadOnDatabase(blogId) {
    const RESPONSE = await CHAT_SCHEMA.updateMany({ blogId: blogId, type: 'writer-to-admin' }, { is_read: true })
    return !RESPONSE ? false : RESPONSE.acknowledged === true ? true : false
}

async function updateMessageByWriterAsReadOnDatabase(blogId) {
    const RESPONSE = await CHAT_SCHEMA.updateMany({ blogId: blogId, type: 'admin-to-writer' }, { is_read: true })
    return !RESPONSE ? false : RESPONSE.acknowledged === true ? true : false
}

module.exports = { addAdminMessageToDatabase, updateMessageAsReadOnDatabase,updateMessageByWriterAsReadOnDatabase }