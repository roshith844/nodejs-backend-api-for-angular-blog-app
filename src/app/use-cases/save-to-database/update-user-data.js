const { updateRole } = require("../../data-access/userService")

async function updateRoleToWriter(userId) {
    const ROLE = 'writer'
    const RESPONSE = await updateRole(userId, ROLE)
    if (RESPONSE == true) {
        return true
    } else {
        return false
    }
}

module.exports = { updateRoleToWriter }