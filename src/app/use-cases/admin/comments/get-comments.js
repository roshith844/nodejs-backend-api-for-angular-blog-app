const { getAllCommentsWithUserDetails } = require("../../../data-access/admin/comments-service")

async function getAllComments() {
    const RESPONSE =  await getAllCommentsWithUserDetails()
    if(RESPONSE.length === 0) return false
    return RESPONSE
   
}
module.exports = { getAllComments }