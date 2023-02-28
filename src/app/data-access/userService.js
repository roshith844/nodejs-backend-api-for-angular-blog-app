const mongoose = require('mongoose')
const USER_MODEL = require('../models/userSchema')

async function getUserDataFromEmail(email) {
    return await USER_MODEL.findOne({ "email": email })
}

async function saveUserData(data) {
    await USER_MODEL.create({ name: data.name, email: data.email, password: data.password })
}

async function isEmailExists(email) {
    return await USER_MODEL.exists({ email: email })
}

async function updateRole(userId, role) {
    const USER_ID_AS_OBJECT_ID = mongoose.Types.ObjectId(userId)
    const DATABASE_RESPONSE = await USER_MODEL.updateOne({ _id: USER_ID_AS_OBJECT_ID }, { role: role })
    if (DATABASE_RESPONSE.acknowledged == true) {
        return true
    } else {
        return false
    }
}

module.exports = { getUserDataFromEmail, saveUserData, isEmailExists, updateRole }