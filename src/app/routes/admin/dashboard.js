const express = require('express')
const router = express.Router()
const DashboardController = require('./../../controllers/admin/dashboard-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/', verifyTokenMiddleware.verifyAdmin, DashboardController.getStatistics)
module.exports = router