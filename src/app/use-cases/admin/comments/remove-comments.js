
const { softDeleteOnDatabase } = require("../../../data-access/interactions/commentService")

async function removeCommentFromblog(blogId, commentId) {
    if(await softDeleteOnDatabase ( blogId, commentId) === true) return true
    return false
}

module.exports = {
    removeCommentFromblog
}