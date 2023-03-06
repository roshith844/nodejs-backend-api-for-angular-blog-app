const { getBlogsFromDatabase } = require("../../../data-access/blog-content-service")

async function getAllBlogs(){
   const ALL_BLOGS =  await getBlogsFromDatabase()
   if (!ALL_BLOGS) {
    return false
  } else {
    return ALL_BLOGS
  }

}

module.exports = {
    getAllBlogs
}