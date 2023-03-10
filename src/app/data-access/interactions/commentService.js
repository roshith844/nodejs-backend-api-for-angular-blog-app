const POST_MODEL = require('./../../models/post-schema')

async function addCommentToDatabase(blogId, userId, comment) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: blogId }, { $push: { comments: { "userId": userId, "message": comment } } }, { upsert: true })
    return RESPONSE.acknowledged
}
async function getCommentsFromDatabase(blogId) {
    const RESPONSE = await POST_MODEL.aggregate([{ $match: { _id: blogId } }, { $project: { _id: 0, comments: 1 } }, { $sort: { created: -1 } }])
    return RESPONSE
}

module.exports = {
    addCommentToDatabase, getCommentsFromDatabase
}