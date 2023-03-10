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

function validatePhoneNumber(phone){
  const PHONE_PATTERN = /^\d{10}$/
  if (typeof phone !== "string") {
    return false
  }

  if (! PHONE_PATTERN.test(phone)) {
    return false
  }
  return true

}

function validatePassword(password) {
      /* 
Password should be
At least 8 characters long
Must contain at least one uppercase letter
Must contain at least one lowercase letter
Must contain at least one number
Must contain at least one special character (@$!%*?&)
  */
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (password.length < 2) {
    return false
  } else if (password.length >= 50) {
    return false
  }else  if (!PASSWORD_PATTERN.test(password)) {
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
  validateEmail, validatePassword, vallidateName, checkUserExistance, validatePhoneNumber
}