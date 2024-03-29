const { response } = require('express')
const POST_MODEL = require('./../../models/post-schema')

async function addCommentToDatabase(blogId, userId, comment) {
    const RESPONSE = await POST_MODEL.findOneAndUpdate({ _id: blogId }, { $push: { comments: { "userId": userId, "message": comment } } }, { new: true, upsert: true })
    if (RESPONSE) return RESPONSE
    return false
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
    }, { $unwind: "$userDetails" }, { $project: { 'userDetails.name': 1, 'userDetails.profie_picture_url': 1, comments: 1 } }, {
        $match: { "comments.isDeleted": false }
    }, { $sort: { "comments.created": -1 } }])
    return RESPONSE
}

async function softDeleteOnDatabase( blogId, commentId, userId) {
    const RESPONSE = await POST_MODEL.updateOne({
        _id: blogId,
        comments: {
            $elemMatch: {
                userId: userId,
                _id: commentId,
            }
        }
    },
        {
            $set: {
                'comments.$.isDeleted': true
            }
        })

    if (RESPONSE.acknowledged === true) return true
    return false
}
module.exports = {
    addCommentToDatabase, getCommentsFromDatabase, softDeleteOnDatabase
}