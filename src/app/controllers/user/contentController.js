const blogService = require('./../../use-cases/get-data-from-database/get-blog')
module.exports = {
    getBlogCards: async (req, res) => {
        const LATEST_BLOG_CARDS = await blogService.getBlogCards()
        res.json({
            "success": true,
            "cards": LATEST_BLOG_CARDS
        })
    },

    getBlogContent: async (req, res) => {
        // get data from database 
        const BLOG_CONTENT = await blogService.getBlogContent(req.params.slug)
        if (BLOG_CONTENT == false) {
            res.json({
                "success": false
            })
        } else {
            console.log(BLOG_CONTENT)
            res.json({
                "success": true,
                "data": BLOG_CONTENT
            })
        }
    }
}