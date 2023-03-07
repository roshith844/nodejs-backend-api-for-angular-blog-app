const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/writer/content-controller')
const verifyTokenMiddleware = require('./../../middlewares/user/verifyToken')

router.post('/create', verifyTokenMiddleware.verifyUser, contentController.postContent)
router.get('/all', verifyTokenMiddleware.verifyUser, contentController.getAllBlogs)
router.get('/get/:slug', verifyTokenMiddleware.verifyUser, contentController.getBlog)
router.patch('/update', verifyTokenMiddleware.verifyUser, contentController.updateBlog)
router.delete('/delete/:id', verifyTokenMiddleware.verifyUser, contentController.deleteBlog)

module.exports = router