const { changeRoleToUserInDatabasebase } = require("../../../data-access/admin/creators-service")

async function changeRoleToUser(userId) {
    if (userId === null || userId === '') return false
    if (await changeRoleToUserInDatabasebase(userId) === true) return true
    return false
}

module.exports = { changeRoleToUser }