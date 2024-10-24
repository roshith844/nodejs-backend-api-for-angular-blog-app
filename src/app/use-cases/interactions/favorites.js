const favoritesService = require('./../../data-access/interactions/favoritesService')
async function checkUserHasFavoritesCollection(userId) {
    const USER_EXISTS = await favoritesService.checkUserExists(userId)
    if (USER_EXISTS == null) {
        return false
    } else {
        return true
    }
}

async function addToFavorites(userId, articleId) {
    
    console.log(userId, articleId)
    const RESPONSE = await favoritesService.pushArticleIdToFavorites(userId, articleId)
    if (RESPONSE.modifiedCount == 1) {
        return true
    } else {
        return false
    }
}
async function RemoveFromFavorites(userId, articleId) {
    const RESPONSE = await favoritesService.pullArticleIdFromFavorites(userId, articleId)
    if (RESPONSE.modifiedCount == 1) {
        return true
    } else {
        return false
    }
}

async function createFavoritesAndAdd(USER_ID, articleId) {
    const RESPONSE = await favoritesService.createFavoritesAndAdd(USER_ID, articleId)
    if (RESPONSE) {
        return true
    } else {
        return false
    }
}

async function isArticleIsOnFavorites(userId, articleId) {
    const RESPONSE = await favoritesService.checkArticleIdExistsOnFavorites(userId, articleId)
    if (RESPONSE.length === 0 || RESPONSE === null) {
        return false
    } else if (RESPONSE[0].count >= 1) {
        return true
    } else {
        return false
    }
}
module.exports = {
    addToFavorites, checkUserHasFavoritesCollection, createFavoritesAndAdd, isArticleIsOnFavorites, RemoveFromFavorites
}