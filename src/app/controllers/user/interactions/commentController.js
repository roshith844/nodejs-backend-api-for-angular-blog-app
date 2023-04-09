const POST_MODEL = require("../../../models/post-schema");
const { softDeleteComment } = require("../../../use-cases/delete-data/delete-comments");
const { addCommentbyBlogId, getCommentsByBlogId } = require("../../../use-cases/interactions/comments");

module.exports = {
    addComment: async (req, res, next) => {
        const USER_ID = req.user
        const { blogId, comment } = req.body
        const RESPONSE = await addCommentbyBlogId(blogId, USER_ID, comment)
        if (RESPONSE != false) res.json({ "success": true, "data": RESPONSE })
    },
    getAllComments: async (req, res, next) => {
        const BLOG_ID = req.params.id
        const COMMENTS = await getCommentsByBlogId(BLOG_ID)
        if (COMMENTS === false) {
            res.json({ "success": false })
            res.end()
            return
        }

        res.json({
            "success": true,
            "comments": COMMENTS
        })

    },
    deleteComment: async (req, res) => {
        const USER_ID = req.user
        const BLOG_ID = req.params.blogId
        const COMMENT_ID = req.params.commentId
        if (await softDeleteComment(BLOG_ID, COMMENT_ID, USER_ID) === true) {
            res.json({ "success": true })
        } else {
            res.json({ "success": false })
        }
    }
}