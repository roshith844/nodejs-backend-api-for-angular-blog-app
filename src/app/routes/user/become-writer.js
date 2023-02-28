const express = require('express')
const router = express.Router()
const becomeWriterController = require('./../../controllers/user/become-writer-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.patch('/apply',verifyTokenMiddleware.verifyUser , becomeWriterController.applyForWriterRole)

module.exports = router