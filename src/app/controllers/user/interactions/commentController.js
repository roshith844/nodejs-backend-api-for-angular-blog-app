const { rawListeners } = require("../../../models/post-schema");
const { addCommentbyBlogId, getCommentsByBlogId } = require("../../../use-cases/interactions/comments");

module.exports = {
    addComment: async (req, res) => {
        const USER_ID = req.user
        const { blogId, comment } = req.body
        const RESPONSE = await addCommentbyBlogId(blogId, USER_ID, comment)
        res.json({ "success": RESPONSE })
    },
    getAllComments: async (req, res) => {
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

    }
}