const { getBlogsOfWriterFromDatabase } = require("../../../data-access/blog-content-service")
const { changeToMongooseObjectId } = require("../../../data-access/modify-data/mongoose-service")
async function getAllBlogs(writerId) {
  const WRITER_ID_AS_OBJECT_ID = changeToMongooseObjectId(writerId)
  const ALL_BLOGS = await getBlogsOfWriterFromDatabase(WRITER_ID_AS_OBJECT_ID)
  if (!ALL_BLOGS) {
    return false
  } else {
    return ALL_BLOGS
  }
}

module.exports = {
  getAllBlogs
}