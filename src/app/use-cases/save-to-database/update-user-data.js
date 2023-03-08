const { updateRole, editProfileOnDataBase } = require("../../data-access/userService")

async function updateRoleToWriter(userId) {
    const ROLE = 'writer'
    const RESPONSE = await updateRole(userId, ROLE)
    if (RESPONSE == true) {
        return true
    } else {
        return false
    }
}

async function editProfilebyId(userId, name, email, phone) {
    const RESPONSE = await editProfileOnDataBase(userId, name, email, phone)
    if (RESPONSE.acknowledged) return true
    return false
}

module.exports = { updateRoleToWriter, editProfilebyId }