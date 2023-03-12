const { addCommentToDatabase, getCommentsFromDatabase } = require("../../data-access/interactions/commentService")
const { changeToMongooseObjectId } = require("../../data-access/modify-data/mongoose-service")
async function addCommentbyBlogId(blogId, userId, comment) {
    const RESPONSE = await addCommentToDatabase(blogId, userId, comment)
    if (RESPONSE != false){

      let commentObj =   RESPONSE.comments.filter((item)=> item.message === comment)
        return commentObj[0]
    } 
    return false
}

async function getCommentsByBlogId(blogId) {
    const BLOG_ID_AS_OBJECT_ID = changeToMongooseObjectId(blogId)
    const RESPONSE = await getCommentsFromDatabase(BLOG_ID_AS_OBJECT_ID)
    if (RESPONSE) return RESPONSE
    return false
}

module.exports = { addCommentbyBlogId, getCommentsByBlogId }