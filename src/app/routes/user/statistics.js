const express = require('express')
const router = express.Router()
const statisticsController = require('./../../controllers/user/statisticsController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/page-view/:articleId', statisticsController.getPageViewsCount )
router.patch('/page-view/increment', statisticsController.incrementPageView )


module.exports = router