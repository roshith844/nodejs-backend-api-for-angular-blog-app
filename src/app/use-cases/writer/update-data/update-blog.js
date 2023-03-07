const { updateBlogOnDatabase } = require("../../../data-access/blog-content-service");

async function findbyIdAndUpdateBlog(articleId, title, slug, content) {
    const RESPONSE = await updateBlogOnDatabase(articleId, title, slug, content)
    if (RESPONSE === true) return true
    return false
}

module.exports = { findbyIdAndUpdateBlog }
