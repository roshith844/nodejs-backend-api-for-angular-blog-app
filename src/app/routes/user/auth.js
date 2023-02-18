const express = require('express')
const router = express.Router()
const authController = require('./../../controllers/user/authController')

router.post('/login', authController.loginUser)
router.get('/', (req, res) => {
    res.send('working')
})

module.exports = router