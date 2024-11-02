const userService = require('./../../data-access/userService')
async function  saveSignupFormData(data){
await userService.saveUserData(data)
}

module.exports = {saveSignupFormData}