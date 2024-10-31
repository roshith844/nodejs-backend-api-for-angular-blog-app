const { deleteBlogbyId } = require("../../use-cases/delete-data/delete-blog")
const { getBlogContent, getBlogFromArticleId } = require("../../use-cases/get-data-from-database/get-blog")
const { stringToObjectId } = require("../../use-cases/modify-data/change-format")
const { isArticleIdExists } = require("../../use-cases/validation/validate-id")
const { validateSlug } = require("../../use-cases/validation/validate-slug")
const WriterGetDataService = require("../../use-cases/writer/get-data/get-blogs")
const { savePost } = require("../../use-cases/writer/save-to-database/save-blog")
const { findbyIdAndUpdateBlog } = require("../../use-cases/writer/update-data/update-blog")
const jwtTokenManagement = require('../../use-cases/token/jwt-token-management')
const userDetailsManagement = require('../../use-cases/get-data-from-database/get-user-details')

module.exports = {
    postContent: async (req, res, next) => {
        const { title, content, slug } = req.body
        const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(req.headers.authorization)
        if (USER_EMAIL == false) {
            res.status(403).json({
                "success": false
            })
            return
        } 
            // Take userId from database
            const USER_ID = await userDetailsManagement.getDocumentId(USER_EMAIL)
            if (USER_ID == false) {
                res.status(403).json({
                    "success": false
                })
                return
            }

        if (title === null || content === null || USER_ID === null || slug === null) {
            res.json({
                "success": false,
                "message": "validation failed"
            })
            res.end()
            return
        }

        // Checks slug is unique
        const IS_VALIDATED = await validateSlug(slug)
        if (IS_VALIDATED != true) {
            res.json({
                "success": false,
                "message": "validation failed"
            })
            res.end()
            return
        }

        const RESPONSE = await savePost(USER_ID, title, content, slug)
        if (RESPONSE === true) {
            res.json({ "success": true })
            res.end()
        } else {
            res.json({ "success": false })
        }

    },

    getAllBlogs: async (req, res, next) => {
        const WRITER_ID = req.user
        const ALL_BLOGS = await WriterGetDataService.getAllBlogs(WRITER_ID)
        if (ALL_BLOGS) {
            res.json({
                "success": true,
                "data": ALL_BLOGS
            })
        } else {
            res.json({ "success": false })
        }

    },

    getBlog: async (req, res, next) => {
        const SLUG = req.params.slug
        const ARTICLE_ID = stringToObjectId(SLUG)
        const BLOG = await getBlogFromArticleId(ARTICLE_ID)
        if (BLOG) {
            res.json({
                "success": true,
                "data": BLOG
            })
        } else {
            res.json({
                "success": false
            })
        }

    },
    updateBlog: async (req, res, next) => {
        const { articleId, title, slug, content } = req.body

        // Checks blog exists
        const isExists = await isArticleIdExists(articleId)
        if (!isExists) {
            res.json({ "success": false })
            res.end()
            return
        }

        //  Updates the blog of id with the given contents
        if (await findbyIdAndUpdateBlog(articleId, title, slug, content)) {
            res.json({
                "success": true
            })
        } else {
            res.json({
                "success": false
            })
        }
    },

    deleteBlog: async (req, res, next) => {
        const BLOG_ID = req.params.id
        const IS_DELETED = await deleteBlogbyId(BLOG_ID)
        res.json({ "success": IS_DELETED })
    }
}