const { rawListeners } = require("../../../models/post-schema");
const { addCommentbyBlogId } = require("../../../use-cases/interactions/comments");

module.exports = {
    addComment: async (req, res) => {
        const USER_ID = req.user
        const { blogId, comment } = req.body
        const RESPONSE = await addCommentbyBlogId(blogId, USER_ID, comment)
        res.json({ "success": RESPONSE })
    }
}