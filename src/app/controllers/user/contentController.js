const { isArticleIsOnFavorites } = require('../../use-cases/interactions/favorites')
const { decodeJwtToken } = require('../../use-cases/token/jwt-token-management')
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
        let isUserLoggedIn = false
        let userId
        let isFavorite = false
        if (req.headers.hasOwnProperty('authorization')) {
            const TOKEN = req.headers.authorization
            const DECODED_TOKEN = decodeJwtToken(TOKEN)
            if (DECODED_TOKEN != false) {
                isUserLoggedIn = true
                userId = DECODED_TOKEN.id

            }
        }

        // get data from database 
        const BLOG = await blogService.getBlogContent(req.params.slug)
        if (BLOG == false) {
            res.json({
                "success": false
            })
        } else {
            if (isUserLoggedIn == true) {
                const ARTICLE_ID = BLOG._id
                if (await isArticleIsOnFavorites(userId, ARTICLE_ID) == true) {
                    isFavorite = true
                }
            }
            res.json({
                "success": true,
                "data": BLOG,
                "loggedIn": isUserLoggedIn,
                "isFavorite": isFavorite
            })
        }
    }
}