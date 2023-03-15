const { changeUserStatusToBlocked } = require("../../../data-access/admin/users-service")

async function blockUserById(userId){
    if(userId === null || userId === '') return false
      if(await changeUserStatusToBlocked(userId) === true ) return true
      return false
}

module.exports = {
    blockUserById
}