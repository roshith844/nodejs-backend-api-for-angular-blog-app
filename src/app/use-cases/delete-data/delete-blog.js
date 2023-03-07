const { softDeleteBlogFromDatabase } = require("../../data-access/blog-content-service")

async function deleteBlogbyId(blogId) {
    const RESPONSE = await softDeleteBlogFromDatabase(blogId)
    if (RESPONSE.acknowledged === true) {
        return true
    }
    return false
}

module.exports = { deleteBlogbyId }