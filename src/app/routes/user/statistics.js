const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const statisticsController = require('./../../controllers/user/statisticsController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/page-view/:articleId', tryCatch(statisticsController.getPageViewsCount))
router.patch('/page-view/increment', tryCatch(statisticsController.incrementPageView))


module.exports = router