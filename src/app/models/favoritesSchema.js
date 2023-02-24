const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const FAVORITES_SCHEMA = new mongoose.Schema({
    userId: {
        type: ObjectId
    },
    items: [{ type: String }]
}, { timestamp: true })

module.exports = mongoose.model('favorites', FAVORITES_SCHEMA)