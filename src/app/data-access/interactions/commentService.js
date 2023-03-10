const { response } = require('express')
const POST_MODEL = require('./../../models/post-schema')

async function addCommentToDatabase(blogId, userId, comment) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: blogId }, { $push: { comments: { "userId": userId, "message": comment } } }, { upsert: true })
    return RESPONSE.acknowledged
}
async function getCommentsFromDatabase(blogId) {
    const RESPONSE = await POST_MODEL.aggregate([{ $match: { _id: blogId } }, { $project: { _id: 0, comments: 1 } }, { $unwind: "$comments" },
    {
        $lookup: {
            from: "users",
            localField: "comments.userId",
            foreignField: "_id",
            as: "userDetails"
        }
    }, { $unwind: "$userDetails" }, { $project: { 'userDetails.name': 1, comments: 1 } }])
    return RESPONSE
}

module.exports = {
    addCommentToDatabase, getCommentsFromDatabase
}