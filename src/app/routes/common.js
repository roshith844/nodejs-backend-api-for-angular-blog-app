const express = require('express')
const router = express.Router()
const commonController = require('./../controllers/commonController')
const verifyTokenMiddleware = require('./../middlewares/user/verifyToken')

router.get('/user-details', commonController.getUserStatus)
router.get('/profile/details', verifyTokenMiddleware.verifyUser, commonController.getProfile )


module.exports = router