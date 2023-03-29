const mongoose = require('mongoose');
const { stringToObjectId } = require('../use-cases/modify-data/change-format');
const { ObjectId } = mongoose.Schema;

const CHAT_SCHEMA = new mongoose.Schema(
    {
        blogId: { type: ObjectId },
        sender: {
            type: mongoose.Schema.Types.Mixed  // ObjectId or 'admin' (string)
        },
        receiver: {
            type: ObjectId
        },
        type: String, // admin-to-writer  || writer-to-admin
        content: String,
        is_read: { type: Boolean, default: false }
    }, { timestamps: true })

module.exports = mongoose.model('chats', CHAT_SCHEMA)