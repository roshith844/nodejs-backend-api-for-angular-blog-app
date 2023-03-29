const mongoose = require('mongoose')

const STATISTICS_SCHEMA = new mongoose.Schema({
    user_category: { type: String },
    visits_count: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('statistics', STATISTICS_SCHEMA)