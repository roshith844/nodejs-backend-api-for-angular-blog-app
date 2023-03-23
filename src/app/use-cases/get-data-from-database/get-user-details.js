const userService = require('./../../data-access/userService')
async function getDocumentId(email) {
    const USER_DETAILS = await userService.getUserDataFromEmail(email)
    if (USER_DETAILS != null) {
        return USER_DETAILS._id
    } else {
        return false
    }
}

async function getUserRole(userId) {
    if (userId == null) return false
    const USER_DETAILS = await userService.getUserDataFromId(userId)
    if (USER_DETAILS != null) {
        return { name: USER_DETAILS.name, role: USER_DETAILS.role, profilePictureUrl: USER_DETAILS.profie_picture_url }
    } else {
        return false
    }
}

async function getUserDetails(userId) {
    const USER_DETAILS = await userService.getUserDataFromId(userId)
    if (USER_DETAILS === null || USER_DETAILS.length === 0) return false
    return USER_DETAILS
}

async function getAdminDetails(adminId) {
    const ADMIN_DETAILS = await userService.getAdminDataFromId(adminId)
    if (ADMIN_DETAILS === null || ADMIN_DETAILS.length === 0) return false
    return ADMIN_DETAILS
}

module.exports = { getDocumentId, getUserRole, getUserDetails, getAdminDetails }