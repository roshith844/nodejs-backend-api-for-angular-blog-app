const { savePost } = require("../../use-cases/writer/save-to-database/save-blog")

module.exports = {
    postContent: async (req, res) => {
        const { title, content, slug } = req.body
        console.log(req.body)
        const USER_ID = req.user
        if (title === null || content === null || USER_ID === null || slug === null) {
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