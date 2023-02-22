const bcrypt = require('bcrypt')
async function passwordMatchBcrypt(passwordFromUser, passwordFromDatabase) {
   return await bcrypt.compare(passwordFromUser, passwordFromDatabase)
}

async function hashPassword(password, saltRounds) {
   return await bcrypt.hash(password, saltRounds)
}

module.exports = { passwordMatchBcrypt, hashPassword }

