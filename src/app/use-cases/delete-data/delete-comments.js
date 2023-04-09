const { softDeleteOnDatabase } = require("../../data-access/interactions/commentService")
const { changeToMongooseObjectId } = require("../../data-access/modify-data/mongoose-service")

async function softDeleteComment(blogId, commentId, userId) {
  const USER_ID_AS_OBJECT_ID = changeToMongooseObjectId(userId)
  if (await softDeleteOnDatabase(blogId, commentId, USER_ID_AS_OBJECT_ID) === true) return true
  return false
}

module.exports = {
  softDeleteComment
}