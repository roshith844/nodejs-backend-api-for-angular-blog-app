const mongoose = require('mongoose')
const POST_SCHEMA = require('../models/post-schema')

async function savePostToDatabase(userId, title, content, slug) {
    const RESPONSE = await POST_SCHEMA.create({ slug: slug, title: title, content: content, author: userId })
    if (RESPONSE) {
        return true
    } else {
        return false
    }
}
module.exports = { savePostToDatabase }