const express = require('express')
const router = express.Router()
const interactionsController = require('./../../controllers/user/interactionsController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.patch('/favorites/add',verifyTokenMiddleware.verifyUser, interactionsController.addToFavorites )

module.exports = router