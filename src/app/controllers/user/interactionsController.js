const favoritesService = require('./../../use-cases/interactions/favorites')
const jwtTokenManagement = require('../../use-cases/token/jwt-token-management')
const userDetailsManagement = require('./../../use-cases/get-data-from-database/get-user-details')

module.exports = {
    addToFavorites: async (req, res) => {
        const { articleId } = req.body

        // decode token
        const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(req.headers.authorization)
        if (USER_EMAIL == false) {
            res.sendStatus(403).json({
                "success": false
            })
            res.end()
            return
        } else {

            // Take userId from database
            const USER_ID = await userDetailsManagement.getDocumentId(USER_EMAIL)
            if (USER_ID == false) {
                res.sendStatus(403).json({
                    "success": false
                })
                res.end()
            } else {

                // check user has favorites doc
                const USER_HAS_FAVORITES_COLLECTIONS = await favoritesService.checkUserHasFavoritesCollection(USER_ID)

                // if favorite exists push articleId to items 
                if (USER_HAS_FAVORITES_COLLECTIONS == true) {

                    const ARTICLE_EXISTS = await favoritesService.ArticleIdExists(USER_ID, articleId)
                    if (ARTICLE_EXISTS == true) {
                        res.json({
                            "success": false,
                            "message": "item already exists"
                        })

                    } else {
                        await favoritesService.addToFavorites(USER_ID, articleId)
                        res.json({
                            "success": true
                        })
                    }

                } else {
                    // if not create new favorites and push 
                    await favoritesService.createFavoritesAndAdd(USER_ID, articleId)
                }
            }

            // store the id of article in collection array
            // console.log(USER_EMAIL)
            // 



        }
    }
}