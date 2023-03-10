const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const POST_SCHEMA = new mongoose.Schema({
    slug: {
        type: String,
        unique: true
    },
    title: String,
    content: String,
    author: { type: ObjectId },
    pageviews: { type: Number, default: 0 },
    tags: [{ type: String, default: 'blog' }],
    likes: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    status: { type: String, default: 'published' },
    deleted: { type: Boolean, default: false },
    comments: [{
        userId: { type:  ObjectId  },
        message: { type: String },
        created: { type: Date, default: Date.now() }
    }]
}, { timestamps: true })

module.exports = mongoose.model('posts', POST_SCHEMA)