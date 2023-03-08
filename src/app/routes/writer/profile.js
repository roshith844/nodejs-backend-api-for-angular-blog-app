const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const verifyTokenMiddleware = require('../../middlewares/user/verifyToken')

router.get('/details', verifyTokenMiddleware.verifyUser, profileController.getProfile )

module.exports = router