const USER_MODEL = require('../models/userSchema')
async function updateProfilePictureUrlInDatabase(userId, imageUrl) {
    const DATABASE_RESPONSE = await USER_MODEL.updateOne({ _id: userId }, { $set: { profie_picture_url: imageUrl } }, { upsert: true })

    if (DATABASE_RESPONSE) return true
    return false
}
module.exports = { updateProfilePictureUrlInDatabase }