const express = require('express')
const router = express.Router()
const commonController = require('./../controllers/commonController')


router.get('/user-details', commonController.getUserDetails)


module.exports = router