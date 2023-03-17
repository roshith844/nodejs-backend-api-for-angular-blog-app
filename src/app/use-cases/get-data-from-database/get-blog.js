const { changeToMongooseObjectId } = require('../../data-access/modify-data/mongoose-service')
const blogContentService = require('./../../data-access/blog-content-service')

async function getBlogCards() {
    let BLOG_CONTENT = await blogContentService.getLatestBlogs(20)

    // Takes only first 200 words from content
    for (let i = 0; i < BLOG_CONTENT.length; i++) {

        BLOG_CONTENT[i].content = BLOG_CONTENT[i].content.substr(0, 200)
    }
    return BLOG_CONTENT
}

async function getBlogContent(slug) {
    const CONTENT = await blogContentService.getBlogContent(slug)
    if (CONTENT !== null) {
        return CONTENT[0]
    } else {
        return false
    }
}

async function getBlogCardFromArticleId(articleIdArray) {
    let BLOG_CARDS = []
    for (let i = 0; i < articleIdArray.length; i++) {
        let ARTICLE_ID_AS_OBJECT_ID = changeToMongooseObjectId(articleIdArray[i])
        let BLOG = await blogContentService.getBlogFormId(ARTICLE_ID_AS_OBJECT_ID)

        if (BLOG != null) {
            if (BLOG.content.length > 200) {
                BLOG.content = BLOG.content.substr(0, 200)
            }
            BLOG_CARDS.push(BLOG)
        }
    }
    return BLOG_CARDS
}

async function getBlogFromArticleId(articleId) {
    if (articleId === null || articleId == '') return false
    const BLOG = await blogContentService.getBlogFormDatabase(articleId)
    if (BLOG === null || !BLOG) return false
    return BLOG
}

module.exports = { getBlogCards, getBlogContent, getBlogCardFromArticleId, getBlogFromArticleId }