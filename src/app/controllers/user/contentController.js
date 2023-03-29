const { isArticleIsOnFavorites } = require('../../use-cases/interactions/favorites')
const { checkAndModifyFavoritesFeild } = require('../../use-cases/send-blog-cards/favorites')
const { decodeJwtToken } = require('../../use-cases/token/jwt-token-management')
const blogService = require('./../../use-cases/get-data-from-database/get-blog')
module.exports = {
    getBlogCards: async (req, res, next) => {
        let userId = false
        const LATEST_BLOG_CARDS = await blogService.getBlogCards()
        // adds isFavorite feild to array with default value false
        const BlOG_CARDS_WITH_FAVORITE_STATUS = LATEST_BLOG_CARDS.map((item) => {
            item.isFavorite = false
            return item
        })
        // Checks user logged in 
        let isUserLoggedIn = false
        if (req.headers.hasOwnProperty('authorization')) {
            const TOKEN = req.headers.authorization
            if (TOKEN != 'null') {
                const DECODED_TOKEN = decodeJwtToken(TOKEN)
                if (DECODED_TOKEN != false) {
                    isUserLoggedIn = true
                    userId = DECODED_TOKEN.id
                }
            }
        }

        if (isUserLoggedIn === true) {
            // function takes in the cards, and userId
            const FINAL_BLOG_CARDS = await checkAndModifyFavoritesFeild(BlOG_CARDS_WITH_FAVORITE_STATUS, userId)

            res.json({
                "success": true,
                "cards": FINAL_BLOG_CARDS
            })
        } else {
            res.json({
                "success": true,
                "cards": BlOG_CARDS_WITH_FAVORITE_STATUS
            })
        }
    },

    getBlogContent: async (req, res, next) => {
        let isUserLoggedIn = false
        let userId
        let isFavorite = false

        if (req.headers.hasOwnProperty('authorization')) {
            const TOKEN = req.headers.authorization

            if (TOKEN !== 'null') {
                const DECODED_TOKEN = decodeJwtToken(TOKEN)
                if (DECODED_TOKEN) {
                    isUserLoggedIn = true
                    userId = DECODED_TOKEN.id
                }
            }
        }

        // get data from database 
        const BLOG = await blogService.getBlogContent(req.params.slug)
        if (BLOG === false) {
            res.json({
                "success": false
            })
        } else {
            if (isUserLoggedIn === true) {
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