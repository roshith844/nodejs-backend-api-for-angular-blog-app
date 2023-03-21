const mongoose = require('mongoose')

const USER_SCHEMA = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profie_picture_url: { type: String, default: 'https://picsum.photos/200/300' },
    password: String,
    role: { type: String, default: 'user' },
    status: { type: String, default: 'active' }
})

module.exports = mongoose.model('users', USER_SCHEMA)