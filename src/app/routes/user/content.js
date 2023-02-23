const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/user/contentController')

router.get('/cards', contentController.getBlogCards)
router.get('/:slug', contentController.getBlogContent)

module.exports = router