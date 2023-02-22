const mongoose = require('mongoose')

const USER_SCHEMA = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }
})

module.exports = mongoose.model('users', USER_SCHEMA)