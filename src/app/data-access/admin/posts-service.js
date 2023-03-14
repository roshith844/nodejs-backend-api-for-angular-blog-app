const POST_MODEL = require('./../../models/post-schema')

async function getAllPostsWithAuthorDetails() {
    return await POST_MODEL.aggregate([
        { $match: { deleted: false } },
        {
            $lookup:
            {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author_details"
            }
        },
        { $unwind: "$author_details" }
    ])
}

async function changeStatusToPublished(blogId) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: blogId }, { status: 'published' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

async function changeStatusToRejected(blogId) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: blogId }, { status: 'rejected' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

module.exports = { getAllPostsWithAuthorDetails, changeStatusToPublished, changeStatusToRejected }