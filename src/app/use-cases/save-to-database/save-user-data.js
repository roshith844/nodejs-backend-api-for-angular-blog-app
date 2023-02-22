const userService = require('./../../data-access/userService')
function saveSignupFormData(data){
userService.saveUserData(data)
}

module.exports = {saveSignupFormData}