const { checkArticleIdExistsOnFavorites } = require('./../../data-access/interactions/favoritesService')
async function checkAndModifyFavoritesFeild(blogCards, userId) {
    let result = blogCards
    if (userId === false || userId === null) return false
    if (blogCards.length === 0 || blogCards === null) return false

    for (let i = 0; i < result.length; i++) {
    let articleId = result[i]._id
        let response = await checkArticleIdExistsOnFavorites(userId, articleId)
        if (response.length !== 0) {
            if (response[0].count >= 0) {
                result[i].isFavorite = true
                console.log(result[i].isFavorite)
            }
        }
    }
    return result
}


module.exports = { checkAndModifyFavoritesFeild }