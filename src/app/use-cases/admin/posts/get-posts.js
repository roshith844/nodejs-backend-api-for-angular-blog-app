const { getAllPostsWithAuthorDetails, getBlogStatusCountFromDatabase } = require("../../../data-access/admin/posts-service")

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

module.exports = { getAllPosts, getBlogStatusCount }