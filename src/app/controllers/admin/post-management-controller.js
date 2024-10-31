const { getAllPosts, getPostByBlogId } = require("../../use-cases/admin/posts/get-posts")
const { publishBlog, rejectBlog } = require("../../use-cases/admin/posts/update-blog")

module.exports = {
    getPosts: async (req, res, next) => {
        const ADMIN_ID = req.admin
        const POSTS = await getAllPosts()
        if (POSTS === false) {
            return res.json({
                "success": false,
                "message": 'no blogs found'
            })
        } else {
            res.json({
                "success": true,
                "data": POSTS
            })
        }
    },
    getPost: async (req, res, next) => {
        const BLOG_ID = req.params.id
        const BLOG_POST = await getPostByBlogId(BLOG_ID)
        if (BLOG_POST === false) {
            return res.json({
                "success": false,
                "message": 'no blogs found'
            })
        } else {
            res.json({
                "success": true,
                "data": BLOG_POST
            })
        }
    },
    approveBlog: async (req, res, next) => {
        const { blogId } = req.body
        const RESPONSE = await publishBlog(blogId)
        console.log(RESPONSE)
        if (RESPONSE === true) return res.json({ "success": true })
        res.json({ "success": false })
    },
    rejecteBlog: async (req, res, next) => {
        const { blogId } = req.body
        const RESPONSE = await rejectBlog(blogId)
        if (RESPONSE === true) return res.json({ "success": true })
        res.json({ "success": false })
    }
}