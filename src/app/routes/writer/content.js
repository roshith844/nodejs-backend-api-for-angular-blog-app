const express = require('express')
const router = express.Router()
const contentController = require('./../../controllers/writer/content-controller')
const verifyToken = require('./../../middlewares/token/verify-token')

router.post('/create', verifyToken.verifyWriter, contentController.postContent)
router.get('/all', verifyToken.verifyWriter, contentController.getAllBlogs)
router.get('/get/:slug', verifyToken.verifyWriter, contentController.getBlog)
router.patch('/update', verifyToken.verifyWriter, contentController.updateBlog)
router.delete('/delete/:id', verifyToken.verifyWriter, contentController.deleteBlog)

module.exports = router