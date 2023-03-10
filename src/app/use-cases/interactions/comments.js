const { addCommentToDatabase } = require("../../data-access/interactions/commentService")
async function addCommentbyBlogId(blogId, userId, comment) {
    const RESPONSE = await addCommentToDatabase(blogId, userId, comment)
    if (RESPONSE === true) return true
    return false
}

module.exports = { addCommentbyBlogId }