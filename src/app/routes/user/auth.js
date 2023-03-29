const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const authController = require('./../../controllers/user/authController')

router.post('/login', tryCatch(authController.loginUser))
router.post('/signup', tryCatch(authController.signupUser))
router.get('/user-details', tryCatch(authController.getUserStatus))

module.exports = router