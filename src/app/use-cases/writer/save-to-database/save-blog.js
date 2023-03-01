const { savePostToDatabase } = require("../../../data-access/writer-service")

async function savePost(userId, title, content, slug) {
    const RESPONSE = await savePostToDatabase(userId, title, content, slug)

    if (RESPONSE === true) return true
    return false
}

module.exports = { savePost }