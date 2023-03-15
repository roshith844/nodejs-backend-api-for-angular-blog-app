const { softDeleteOnDatabase } = require("../../data-access/interactions/commentService")

async function softDeleteComment( blogId, commentId){
  if(await softDeleteOnDatabase ( blogId, commentId) === true) return true
  return false
}

module.exports = {
    softDeleteComment
}