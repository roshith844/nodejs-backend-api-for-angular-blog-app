const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const { tryCatch } = require('../../utils/try-catch')
const verifyToken = require('./../../middlewares/token/verify-token')

router.get('/details', verifyToken.verifyWriter, tryCatch(profileController.getProfile))

module.exports = router