const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/user/contentController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/cards', contentController.getBlogCards)
router.get('/:slug', contentController.getBlogContent)

module.exports = router