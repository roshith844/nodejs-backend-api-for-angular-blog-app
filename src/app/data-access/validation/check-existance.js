const POST_MODEL = require('./../../models/post-schema')

async function isArticleIdExistsOnDatabase(articleId) {
    const RESPONSE = await POST_MODEL.exists({ _id: articleId })
    if (RESPONSE === null) {
        return false
    } else if (RESPONSE.hasOwnProperty('_id')) {
        return true
    }
}

module.exports = {
    isArticleIdExistsOnDatabase
}