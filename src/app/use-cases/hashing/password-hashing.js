const bcryptService = require('../../data-access/bcyptService')
function hashPassword(password){
  return bcryptService.hashPassword(password, 10)
}

module.exports = {hashPassword} 