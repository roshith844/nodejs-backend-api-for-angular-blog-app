const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const interactionsController = require('./../../controllers/user/interactionsController')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')


router.patch('/favorites/add-or-remove', verifyTokenMiddleware.verifyUser, tryCatch(interactionsController.addOrRemoveFromFavorites))
router.get('/favorites/get/cards', verifyTokenMiddleware.verifyUser, tryCatch(interactionsController.getFavoritesCards))

module.exports = router