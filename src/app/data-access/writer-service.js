const mongoose = require('mongoose')
const POST_MODEL = require('../models/post-schema')


async function savePostToDatabase(userId, title, content, slug) {

    const USER_ID_AS_OBJECT_ID = mongoose.Types.ObjectId(userId)
    const DOC = await POST_MODEL.create({ slug: slug, title: title, content: content, author: USER_ID_AS_OBJECT_ID })
    const RESPONSE = await DOC.save()
    if (RESPONSE) {
        return true
    } else {
        return false
    }
}

module.exports = { savePostToDatabase }