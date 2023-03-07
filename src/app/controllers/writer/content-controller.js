const { getBlogContent, getBlogFromArticleId } = require("../../use-cases/get-data-from-database/get-blog")
const { stringToObjectId } = require("../../use-cases/modify-data/change-format")
const { isArticleIdExists } = require("../../use-cases/validation/validate-id")
const { validateSlug } = require("../../use-cases/validation/validate-slug")
const WriterGetDataService = require("../../use-cases/writer/get-data/get-blogs")
const { savePost } = require("../../use-cases/writer/save-to-database/save-blog")
const { findbyIdAndUpdateBlog } = require("../../use-cases/writer/update-data/update-blog")

module.exports = {
    postContent: async (req, res) => {
        const { title, content, slug } = req.body
        const USER_ID = req.user

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

    getAllBlogs: async (req, res) => {
        const ALL_BLOGS = await WriterGetDataService.getAllBlogs()
        if (ALL_BLOGS) {
            res.json({
                "success": true,
                "data": ALL_BLOGS
            })
        } else {
            res.json({ "success": false })
        }

    },

    getBlog: async (req, res) => {
        // console.log("statilng")
        const SLUG = req.params.slug
        const ARTICLE_ID = stringToObjectId(SLUG)
        // console.log(ARTICLE_ID)
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
    updateBlog: async (req, res) => {
        const { articleId, title, slug, content } = req.body
        console.log(req.body)
        // Checks blog exists
        const isExists = await isArticleIdExists(articleId)
        if (!isExists) {
            res.json({ "success": false })
            res.end()
            return
        }
        //  update the blog of id with the given contents
      if(await  findbyIdAndUpdateBlog(articleId, title, slug, content)){
        res.json({
            "success": true 
        })
      }else{
        res.json({
            "success": false
        })
      }
    }
}