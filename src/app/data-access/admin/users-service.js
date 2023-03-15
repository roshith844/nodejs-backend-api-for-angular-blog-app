const USER_MODEL = require('./../../models/userSchema')

async function changeUserStatusToBlocked(userId) {
    const RESPONSE = await USER_MODEL.updateOne({ _id: userId }, { status: 'blocked' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

module.exports = { changeUserStatusToBlocked }