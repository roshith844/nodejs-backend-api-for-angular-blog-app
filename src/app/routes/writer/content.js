const express = require('express')
const { tryCatch } = require('../../utils/try-catch')
const router = express.Router()
const contentController = require('./../../controllers/writer/content-controller')
const verifyToken = require('./../../middlewares/token/verify-token')

router.post('/create', verifyToken.verifyWriter, tryCatch(contentController.postContent))
router.get('/all', verifyToken.verifyWriter, tryCatch(contentController.getAllBlogs))
router.get('/get/:slug', verifyToken.verifyWriter, tryCatch(contentController.getBlog))
router.patch('/update', verifyToken.verifyWriter, tryCatch(contentController.updateBlog))
router.delete('/delete/:id', verifyToken.verifyWriter, tryCatch(contentController.deleteBlog))

module.exports = router