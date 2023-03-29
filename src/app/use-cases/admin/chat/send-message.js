const { addAdminMessageToDatabase } = require("../../../data-access/admin/chat-service")
const { changeToMongooseObjectId } = require("../../../data-access/modify-data/mongoose-service")

async function sendMessageToWriter(blogId, message, authorId, adminId) {
    if (blogId === null || message === null || authorId === null || adminId === null) return false

    const BLOG_ID_AS_OBJECT_ID = changeToMongooseObjectId(blogId)
    const AUTHOR_ID_AS_OBJECT_ID = changeToMongooseObjectId(authorId)
    const ADMIN_ID_AS_OBJECT_ID = changeToMongooseObjectId(adminId)

    const RESPONSE = await addAdminMessageToDatabase(BLOG_ID_AS_OBJECT_ID, message, AUTHOR_ID_AS_OBJECT_ID, ADMIN_ID_AS_OBJECT_ID)
    if (RESPONSE === true) return true
    return false
}


module.exports = { sendMessageToWriter }