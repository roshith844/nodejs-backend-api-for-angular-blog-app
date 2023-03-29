const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const writerDashboardController = require('./../../controllers/writer/dashboard-controller')
const verifyToken = require('./../../middlewares/token/verify-token')

router.get('/', verifyToken.verifyWriter,tryCatch( writerDashboardController.getStatistics))

module.exports = router