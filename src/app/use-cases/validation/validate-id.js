const { isArticleIdExistsOnDatabase } = require("../../data-access/validation/check-existance")

async function isArticleIdExists(articleId) {
    const isExists = await isArticleIdExistsOnDatabase(articleId)
    if (isExists) return true
    return false
}

module.exports = {
    isArticleIdExists
}