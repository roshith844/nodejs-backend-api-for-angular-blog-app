const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const DashboardController = require('./../../controllers/admin/dashboard-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/', verifyTokenMiddleware.verifyAdmin, tryCatch(DashboardController.getStatistics))
module.exports = router