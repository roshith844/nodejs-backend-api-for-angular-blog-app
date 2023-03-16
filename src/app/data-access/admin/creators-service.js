const USER_MODEL = require('./../../models/userSchema')
async function getCreatorsDetailsFromDatabase() {
    const RESPONSE = await USER_MODEL.find({ role: 'writer' })
    if (RESPONSE) return RESPONSE
    return false
}

async function changeRoleToUserInDatabasebase(userId) {
    const RESPONSE = await USER_MODEL.updateOne({ _id: userId }, { role: 'user' })
    if (RESPONSE.acknowledged === true) return true
    return false
}

module.exports = { getCreatorsDetailsFromDatabase, changeRoleToUserInDatabasebase }