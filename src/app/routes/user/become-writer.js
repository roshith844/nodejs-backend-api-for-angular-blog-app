const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const becomeWriterController = require('./../../controllers/user/become-writer-controller')
const verifyTokenMiddleware = require('./../../middlewares/token/verify-token')

router.patch('/apply', verifyTokenMiddleware.verifyUser, tryCatch(becomeWriterController.applyForWriterRole))

module.exports = router