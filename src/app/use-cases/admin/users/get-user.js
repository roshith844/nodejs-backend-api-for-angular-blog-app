const { getUserDetailsFromDatabase } = require("../../../data-access/admin/users-service")

async function getAllUserDetails() {
    const USERS = await getUserDetailsFromDatabase()
    if (USERS) return USERS
    return false
}

module.exports = {
    getAllUserDetails
}