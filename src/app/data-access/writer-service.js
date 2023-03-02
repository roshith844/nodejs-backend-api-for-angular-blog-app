const mongoose = require('mongoose')
const POST_SCHEMA = require('../models/post-schema')


async function savePostToDatabase(userId, title, content, slug) {

    const USER_ID_AS_OBJECT_ID = mongoose.Types.ObjectId(userId)
    const RESPONSE = await POST_SCHEMA.create({ slug: slug, title: title, content: content, author: USER_ID_AS_OBJECT_ID })
    if (RESPONSE) {
        return true
    } else {
        return false
    }
}

module.exports = { savePostToDatabase }