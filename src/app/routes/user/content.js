const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/user/contentController')

router.get('/cards', contentController.getBlogCards)

module.exports = router