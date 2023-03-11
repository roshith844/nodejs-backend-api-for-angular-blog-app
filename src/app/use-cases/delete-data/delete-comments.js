const { softDeleteOnDatabase } = require("../../data-access/interactions/commentService")

async function softDeleteComment(userId, blogId, commentId){
  if(await softDeleteOnDatabase (userId, blogId, commentId) === true) return true
  return false
}

module.exports = {
    softDeleteComment
}