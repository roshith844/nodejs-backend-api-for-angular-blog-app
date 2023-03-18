const express = require('express')
const router = express.Router()
const writerDashboardController = require('./../../controllers/writer/dashboard-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get( '/', verifyTokenMiddleware.verifyUser, writerDashboardController.getStatistics )

module.exports = router