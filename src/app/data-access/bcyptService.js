const bcrypt = require('bcrypt')
async function passwordMatchBcrypt(passwordFromUser, passwordFromDatabase) {
   return await bcrypt.compare(passwordFromUser, passwordFromDatabase)
}

module.exports = { passwordMatchBcrypt }

