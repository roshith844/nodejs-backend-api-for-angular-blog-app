const { getAllPostsWithAuthorDetails } = require("../../../data-access/admin/posts-service")

async function getAllPosts(){
  const RESPONSE =  await getAllPostsWithAuthorDetails()
if(RESPONSE.length === 0) return false
return RESPONSE
}

module.exports = { getAllPosts }