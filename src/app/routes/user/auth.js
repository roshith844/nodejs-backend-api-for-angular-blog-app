const express = require('express')
const router = express.Router()
const authController = require('./../../controllers/user/authController')

router.get('/', (req, res) => {
    res.send('working')
})
router.post('/login', authController.loginUser)
router.post('/signup', authController.signupUser)


module.exports = router