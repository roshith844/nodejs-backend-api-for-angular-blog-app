const mongoose = require('mongoose')

const POST_SCHEMA = new mongoose.Schema({
    slug: {
        type: String,
        unique: true
    },
    title: String,
    content: String,
    author : String,
    tags: [{ type: String, default: 'blog' }],
    likes: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 }
}, { timestamp: true })

module.exports = mongoose.model('posts', POST_SCHEMA)