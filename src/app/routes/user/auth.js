const express = require('express')
const router = express.Router()
const authController = require('./../../controllers/user/authController')

router.post('/login', authController.loginUser)
router.post('/signup', authController.signupUser)
router.get('/user-details', authController.getUserStatus)


module.exports = router