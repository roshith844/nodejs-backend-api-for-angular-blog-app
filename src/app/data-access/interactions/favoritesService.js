const FAVORITES_SCHEMA = require('../../models/favoritesSchema')
async function checkUserExists(userId) {

    /*
    Returns a document with _id only if at least one document exists in the database that matches the given filter, 
    and null otherwise.
    */
    return await FAVORITES_SCHEMA.exists({ userId: userId })
}

async function pushArticleIdToFavorites(userId, articleId) {
    return await FAVORITES_SCHEMA.updateOne({ userId: userId }, { $push: { items: articleId } })
}

async function createFavoritesAndAdd(userId, articleId) {
    return await FAVORITES_SCHEMA.create({
        userId: userId,
        items: [articleId]
    })
}

async function checkArticleIdExistsOnDatabase(userId, articleId){
    // match unwind and find count , if count is 1 reeturn true
       return await FAVORITES_SCHEMA.aggregate([{$match: {userId: userId}}, {$unwind: "$items"},{$match: { items: articleId }},{$count: "count"}])
    }
module.exports = { checkUserExists, pushArticleIdToFavorites, createFavoritesAndAdd, checkArticleIdExistsOnDatabase}