const express = require('express')
const router = express.Router()
const creatorManagementController = require('./../../controllers/admin/creator-management-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.get('/all', verifyTokenMiddleware.verifyAdmin, creatorManagementController.getCreatorsData)
router.patch('/dismiss', verifyTokenMiddleware.verifyAdmin, creatorManagementController.dismissCreator)

module.exports = router