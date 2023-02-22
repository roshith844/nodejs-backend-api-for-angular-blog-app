const userService = require('./../../data-access/userService')
function vallidateName(name) {
  const NAME_PATTERN = /^[a-z ,.'-]+$/i
  if (typeof name != 'string') {
    return
  }
  if (!NAME_PATTERN.test(name)) {
    return false
  }
  return true
}

function validateEmail(email) {
  const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (typeof email !== "string") {
    return false
  }

  if (!EMAIL_PATTERN.test(email)) {
    return false
  }
  return true
}

function validatePassword(password) {
  if (password.length < 2) {
    return false
  } else if (password.length >= 50) {
    return false
  }
  return true
}

async function checkUserExistance(email) {
  if (await userService.isEmailExists(email) != null) {
    return true
  }
  return false
}
module.exports = {
  validateEmail, validatePassword, vallidateName, checkUserExistance
}