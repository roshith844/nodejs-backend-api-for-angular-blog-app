const userService = require('./../../data-access/userService')
async function getDocumentId(email) {
    const USER_DETAILS = await userService.getUserDataFromEmail(email)
    if (USER_DETAILS != null || USER_DETAILS.length !== 0) {
        return USER_DETAILS._id
    } else {
        return false
    }
}

async function getUserRole(userId) {
    if (userId == null) return false
    const USER_DETAILS = await userService.getUserDataFromId(userId)
    if (USER_DETAILS != null || USER_DETAILS.length !== 0) {
        return USER_DETAILS.role
    } else {
        return false
    }

}

module.exports = { getDocumentId, getUserRole }