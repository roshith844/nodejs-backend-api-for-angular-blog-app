const { validateSlug } = require("../../use-cases/validation/validate-slug")
const { savePost } = require("../../use-cases/writer/save-to-database/save-blog")

module.exports = {
    postContent: async (req, res) => {
        const { title, content, slug } = req.body
        const USER_ID = req.user

        if (title === null || content === null || USER_ID === null || slug === null) {
            res.json({
                "success": false,
                "message": "validation failed"
            })
            res.end()
            return
        }

        // Checks slug is unique
        const IS_VALIDATED = await validateSlug(slug)
        if (IS_VALIDATED != true) {
            res.json({
                "success": false,
                "message": "validation failed"
            })
            res.end()
            return
        }

        const RESPONSE = await savePost(USER_ID, title, content, slug)
        if (RESPONSE === true) {
            res.json({ "success": true })
            res.end()
        } else {
            res.json({ "success": false })
        }

    }
}