const { getUserDataFromEmail } = require("../../data-access/userService")

async function verifyAdmin(email, password) {

    if (typeof email != 'string' || typeof password != 'string') return false

    const USER_DETAILS = await getUserDataFromEmail(email)

    if (USER_DETAILS) {
        if (USER_DETAILS.password === password && USER_DETAILS.role === 'admin') return true
        return false
    }

    return false
}

module.exports = {
    verifyAdmin
}