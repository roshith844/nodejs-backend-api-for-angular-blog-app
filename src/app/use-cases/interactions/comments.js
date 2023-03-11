const { addCommentToDatabase, getCommentsFromDatabase } = require("../../data-access/interactions/commentService")
const { changeToMongooseObjectId } = require("../../data-access/modify-data/mongoose-service")
async function addCommentbyBlogId(blogId, userId, comment) {
    const RESPONSE = await addCommentToDatabase(blogId, userId, comment)
    if (RESPONSE != false) return RESPONSE
    return false
}

async function getCommentsByBlogId(blogId) {
    const BLOG_ID_AS_OBJECT_ID = changeToMongooseObjectId(blogId)
    const RESPONSE = await getCommentsFromDatabase(BLOG_ID_AS_OBJECT_ID)
    if (RESPONSE) return RESPONSE
    return false
}

module.exports = { addCommentbyBlogId, getCommentsByBlogId }