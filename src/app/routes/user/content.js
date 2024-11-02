const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const contentController = require('./../../controllers/user/contentController')

router.get('/cards', tryCatch(contentController.getBlogCards))
router.get('/:slug', tryCatch(contentController.getBlogContent))

module.exports = router



