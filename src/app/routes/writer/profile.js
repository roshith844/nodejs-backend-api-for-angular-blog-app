const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const verifyToken = require('./../../middlewares/token/verify-token')

router.get('/details', verifyToken.verifyWriter, profileController.getProfile)

module.exports = router