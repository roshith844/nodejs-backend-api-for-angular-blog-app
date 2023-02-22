const mongoose = require('mongoose')
const USER_MODEL = require('../models/userSchema')

async function getUserDataFromEmail(email) {
    return await USER_MODEL.findOne({ "email": email })
}

async function saveUserData(data){
   await USER_MODEL.create({name: data.name, email: data.email, password: data.password })
}

module.exports = { getUserDataFromEmail,saveUserData }