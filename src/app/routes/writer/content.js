const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/writer/content-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.post('/create', verifyTokenMiddleware.verifyUser, contentController.postContent)
router.get('/all',verifyTokenMiddleware.verifyUser,contentController.getAllBlogs )


module.exports = router