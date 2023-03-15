const { changeUserStatusToBlocked, changeUserStatusToActive } = require("../../../data-access/admin/users-service")

async function blockUserById(userId) {
    if (userId === null || userId === '') return false
    if (await changeUserStatusToBlocked(userId) === true) return true
    return false
}

async function UnBlockUserById(userId) {
    if (userId === null || userId === '') return false
    if (await changeUserStatusToActive(userId) === true) return true
    return false
}

module.exports = {
    blockUserById, UnBlockUserById
}