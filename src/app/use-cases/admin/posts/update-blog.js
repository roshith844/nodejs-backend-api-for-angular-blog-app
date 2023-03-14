const { changeStatusToPublished, changeStatusToRejected } = require("../../../data-access/admin/posts-service")

async function publishBlog(blogId) {
  if (blogId === null || blogId === undefined || blogId === '') return false
  if (await changeStatusToPublished(blogId) === true) return true
  return false
}

async function rejectBlog(blogId) {
  if (blogId === null || blogId === undefined || blogId === '') return false
  if (await changeStatusToRejected(blogId) === true) return true
  return false
}

module.exports = {
  publishBlog, rejectBlog
}