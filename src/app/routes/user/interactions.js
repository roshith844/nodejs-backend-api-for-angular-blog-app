const express = require('express')
const router = express.Router()
const interactionsController = require('./../../controllers/user/interactionsController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.patch('/favorites/add-or-remove', verifyTokenMiddleware.verifyUser, interactionsController.addOrRemoveFromFavorites)
router.get('/favorites/get/cards', verifyTokenMiddleware.verifyUser, interactionsController.getFavoritesCards)

module.exports = router