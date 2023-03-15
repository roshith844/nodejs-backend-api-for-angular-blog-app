const USER_MODEL = require('./../../models/userSchema')

async function changeUserStatusToBlocked(userId) {
    const RESPONSE = await USER_MODEL.updateOne({ _id: userId }, { status: 'blocked' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

async function changeUserStatusToActive(userId) {
    const RESPONSE = await USER_MODEL.updateOne({ _id: userId }, { status: 'active' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

async function getUserDetailsFromDatabase() {
    const RESPONSE = await USER_MODEL.find({})
    if (RESPONSE) return RESPONSE
    return false
}

module.exports = { changeUserStatusToBlocked, getUserDetailsFromDatabase, changeUserStatusToActive }