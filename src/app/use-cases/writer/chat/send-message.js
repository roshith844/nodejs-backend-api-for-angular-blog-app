const { changeToMongooseObjectId } = require("../../../data-access/modify-data/mongoose-service")
const { addWriterMessageToDatabase } = require("../../../data-access/writer/chat-service")

async function sendMessageToAdmin(blogId, message, authorId, writerId) {
    if (blogId === null || message === null || authorId === null || writerId=== null) return false

    const BLOG_ID_AS_OBJECT_ID = changeToMongooseObjectId(blogId)
    const AUTHOR_ID_AS_OBJECT_ID = changeToMongooseObjectId(authorId)
    const WRITER_ID_AS_OBJECT_ID = changeToMongooseObjectId(writerId)

    const RESPONSE = await addWriterMessageToDatabase(BLOG_ID_AS_OBJECT_ID, message, AUTHOR_ID_AS_OBJECT_ID, WRITER_ID_AS_OBJECT_ID  )
    if (RESPONSE === true) return true
    return false
}

module.exports = { sendMessageToAdmin }