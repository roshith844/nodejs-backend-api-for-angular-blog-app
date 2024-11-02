const { changeToMongooseObjectId } = require('../../data-access/modify-data/mongoose-service')
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
        return {
            id: USER_DETAILS._id.toString(),
            name: USER_DETAILS.name,
            role: USER_DETAILS.role,
            profilePictureUrl: USER_DETAILS.profie_picture_url
        }
    } else {
        return false
    }
}

async function getUserProfileData(userId){
    if (userId == null) return false
    const USER_DETAILS = await userService.getUserDataFromId(userId)
    console.log(USER_DETAILS)
    if (USER_DETAILS != null) {
        return {
            id: USER_DETAILS._id.toString(),
            name: USER_DETAILS.name,
            role: USER_DETAILS.role,
            profilePictureUrl: USER_DETAILS.profie_picture_url
        }
    } else {
        return false
    }
}

async function getUserDetails(userId) {
    const USER_DETAILS = await userService.getUserDataFromId(userId)
    if (USER_DETAILS === null || USER_DETAILS.length === 0) return false
    return USER_DETAILS
}
async function getUserRoleAndStatus(userId) {
    const RESPONSE = await userService.getUserRoleAndStatusFromDatabase(userId)
    return !RESPONSE ? false : RESPONSE.length === 0 ? false : RESPONSE[0]
}


async function  fetchUserDetails(email) {
    const RESPONSE = await userService.getUserAuthDetails(email)
    return !RESPONSE ? false : RESPONSE.length === 0 ? false : RESPONSE[0]
}

async function getAdminDetails(adminId) {
    const ADMIN_DETAILS = await userService.getAdminDataFromId(adminId)
    if (ADMIN_DETAILS === null || ADMIN_DETAILS.length === 0) return false
    return ADMIN_DETAILS
}

module.exports = { getDocumentId, getUserRole, getUserDetails, getAdminDetails, getUserRoleAndStatus, getUserProfileData, fetchUserDetails }