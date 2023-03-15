const { getAllComments } = require("../../use-cases/admin/comments/get-comments")
const { removeCommentFromblog } = require("../../use-cases/admin/comments/remove-comments")
const { softDeleteComment } = require("../../use-cases/delete-data/delete-comments")

module.exports = {
    getComments: async (req, res) => {
        const COMMENTS = await getAllComments()
        if (COMMENTS === false) {
            return res.json({
                "success": false,
                "message": 'no comments found'
            })
        } else {
            res.json({
                "success": true,
                "data": COMMENTS
            })
        }
    },
    removeUserComment: async (req, res) => {
        const { blogId, commentId } = req.body
        if (await softDeleteComment(blogId, commentId) === true) {
            return res.json({ "success": true })

            
        } else {
            res.json({ "success": false, "message": "something went wrong" })
        }
    }
}