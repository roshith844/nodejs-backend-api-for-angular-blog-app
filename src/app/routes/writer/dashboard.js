const express = require('express')
const router = express.Router()
const writerDashboardController = require('./../../controllers/writer/dashboard-controller')
const verifyToken = require('./../../middlewares/token/verify-token')

router.get('/', verifyToken.verifyWriter, writerDashboardController.getStatistics)

module.exports = router