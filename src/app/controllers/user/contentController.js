const blogService = require('./../../use-cases/get-data-from-database/get-blog')
module.exports = {
    getBlogCards: async (req, res) => {
        const LATEST_BLOG_CARDS = await blogService.getBlogCards()
        res.json({
            "success": true,
            "cards": LATEST_BLOG_CARDS
        })
    }
}