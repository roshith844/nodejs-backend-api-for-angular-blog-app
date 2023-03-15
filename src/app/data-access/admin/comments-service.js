const POST_MODEL = require('./../../models/post-schema')

async function getAllCommentsWithUserDetails() {
    return await POST_MODEL.aggregate([
        { $match: { deleted: false } },
        { $project: { _id: 1, comments: 1 } },
        { $unwind: "$comments" },
        {
            $lookup:
            {
                from: "users",
                localField: "comments.userId",
                foreignField: "_id",
                as: "user_details"
            }
        },
        { $match: { "comments.isDeleted": false } },
        { $unwind: "$user_details" }
    ])
}

module.exports = { getAllCommentsWithUserDetails}