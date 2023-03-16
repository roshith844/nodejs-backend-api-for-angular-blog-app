const USER_MODEL = require('./../../models/userSchema')
async function getCreatorsDetailsFromDatabase() {
    const RESPONSE = await USER_MODEL.find({role: 'writer'})
    if (RESPONSE) return RESPONSE
    return false
}

module.exports = { getCreatorsDetailsFromDatabase }