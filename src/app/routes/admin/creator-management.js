const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const creatorManagementController = require('./../../controllers/admin/creator-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/token/verify-token')

router.get('/all', verifyTokenMiddleware.verifyAdmin, tryCatch(creatorManagementController.getCreatorsData))
router.patch('/dismiss', verifyTokenMiddleware.verifyAdmin, tryCatch(creatorManagementController.dismissCreator))

module.exports = router