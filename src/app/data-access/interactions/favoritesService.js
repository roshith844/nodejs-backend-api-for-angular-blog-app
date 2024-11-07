const FAVORITES_MODEL = require('../../models/favoritesSchema')
const mongoose = require('mongoose')
async function checkUserExists(userId) {
    return await FAVORITES_MODEL.findOne({ userId: userId })
}

async function pushArticleIdToFavorites(userId, articleId) {
    return await FAVORITES_MODEL.updateOne({ userId: userId }, { $push: { items: articleId } })
}

// Removes articleId from favorites collection
async function pullArticleIdFromFavorites(userId, articleId) {
    return await FAVORITES_MODEL.updateOne({ userId: userId }, { $pull: { items: articleId } })
}

async function createFavoritesAndAdd(userId, articleId) {
    return await FAVORITES_MODEL.create({
        userId: userId,
        items: [articleId]
    })
}

async function checkArticleIdExistsOnFavorites(userId, articleId) {
    const USER_ID_AS_OBJECT_ID = mongoose.Types.ObjectId(userId)
    const ARTICLE_ID = articleId.toString()

    return await FAVORITES_MODEL.aggregate([{ $match: { userId: USER_ID_AS_OBJECT_ID } }, { $unwind: "$items" }, { $match: { items: ARTICLE_ID } }, { $count: 'count' }])
}

async function getFavorites(userId) {
    return await FAVORITES_MODEL.aggregate([{ $match: { userId: userId } }])
}

module.exports = { checkUserExists, pushArticleIdToFavorites, createFavoritesAndAdd, checkArticleIdExistsOnFavorites, getFavorites, pullArticleIdFromFavorites }