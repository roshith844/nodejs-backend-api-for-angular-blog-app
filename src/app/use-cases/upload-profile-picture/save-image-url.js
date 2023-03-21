const { updateProfilePictureUrlInDatabase } = require("../../data-access/cloudinaryService")


async function saveUserProfilePictureUrl(userId, imageUrl) {
    if (userId === null || imageUrl === null || userId === '' || imageUrl === '') return false
    const RESPONSE = await updateProfilePictureUrlInDatabase(userId, imageUrl)
    if (RESPONSE === true) return true
    return false
}

module.exports = { saveUserProfilePictureUrl }