const POST_MODEL = require('./../../models/post-schema')

async function addCommentToDatabase(blogId, userId, comment) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: blogId }, { $push: { comments: { "userId": userId, "message": comment } } }, { upsert: true })
    return RESPONSE.acknowledged
}

module.exports = {
    addCommentToDatabase
}