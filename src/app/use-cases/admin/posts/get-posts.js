const { getAllPostsWithAuthorDetails, getBlogStatusCountFromDatabase, getBlogStatusCountByIdFromDatabase } = require("../../../data-access/admin/posts-service")
const { changeToMongooseObjectId } = require("../../../data-access/modify-data/mongoose-service")

async function getAllPosts() {
  const RESPONSE = await getAllPostsWithAuthorDetails()
  if (RESPONSE.length === 0) return false
  return RESPONSE
}

async function getBlogStatusCount() {
  let statusCount = {}

  let response = await getBlogStatusCountFromDatabase()

  if (!response) return false
  response.forEach((item) => {
    statusCount[item._id] = item.count
  })

  return statusCount
}

async function getBlogStatusCountbyUserId(userId) {
  let statusCount = {}
   const USER_ID =  changeToMongooseObjectId(userId)
  let response = await getBlogStatusCountByIdFromDatabase(USER_ID)

  if (!response) return false
  response.forEach((item) => {
    statusCount[item._id] = item.count
  })

  return statusCount
}

// 
module.exports = { getAllPosts, getBlogStatusCount,getBlogStatusCountbyUserId }