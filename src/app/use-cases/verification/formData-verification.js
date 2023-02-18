const userDataAccess = require('../../data-access/userService')
const bcryptService = require('../../data-access/bcyptService')
async function verifyUser(email, password) {
    if (typeof email != 'string' || typeof email != 'string') return false
    const USER_DETAILS = await userDataAccess.getUserDataFromEmail(email)
    const PASSWORD_MATCHED = await bcryptService.passwordMatchBcrypt(password, USER_DETAILS.password)
    if (PASSWORD_MATCHED) {
        return true
    } else {
        return false
    }
}

module.exports = { verifyUser }