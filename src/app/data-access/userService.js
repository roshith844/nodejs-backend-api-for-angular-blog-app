const mongoose = require('mongoose')
const USER_MODEL = require('../models/userSchema')

async function getUserDataFromEmail(email) {
    return await USER_MODEL.findOne({ "email": email })
}

module.exports = { getUserDataFromEmail }