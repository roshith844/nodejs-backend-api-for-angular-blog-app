const FAVORITES_MODEL = require('../../models/favoritesSchema')
async function checkUserExists(userId) {

    /*
    Returns a document with _id only if at least one document exists in the database that matches the given filter, 
    and null otherwise.
    */
    return await FAVORITES_MODEL.findOne({ userId: userId })
}

async function pushArticleIdToFavorites(userId, articleId) {
    return await FAVORITES_MODEL.updateOne({ userId: userId }, { $push: { items: articleId } })
}

async function createFavoritesAndAdd(userId, articleId) {
    return await FAVORITES_MODEL.create({
        userId: userId,
        items: [articleId]
    })
}

async function checkArticleIdExistsOnDatabase(userId, articleId) {
    // match unwind and find count , if count is 1 return true
    return await FAVORITES_MODEL.aggregate([{ $match: { userId: userId } }, { $unwind: "$items" }, { $match: { items: articleId } }, { $count: "count" }]).exec()
}

async function getFavorites(userId) {
    return await FAVORITES_MODEL.aggregate([{ $match: { userId: userId } }])
}

module.exports = { checkUserExists, pushArticleIdToFavorites, createFavoritesAndAdd, checkArticleIdExistsOnDatabase, getFavorites }