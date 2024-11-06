const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const authController = require('./../../controllers/admin/authController')

router.post('/login', tryCatch(authController.loginAdmin))
router.post('/logout', tryCatch(authController.logoutAdmin))

module.exports = router