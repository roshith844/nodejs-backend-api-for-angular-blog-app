const POST_MODEL = require('../models/post-schema')

async function getLatestBlogs(numberOfBlogs) {
  return await POST_MODEL.aggregate([
    { $match: { deleted: false } },
    {
      $lookup:
      {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author_details"
      }
    },
    { $unwind: "$author_details" }, { $limit: numberOfBlogs }])
}

async function getBlogContent(slug) {
  return await POST_MODEL.aggregate([{ $match: { slug: slug, deleted: false } },

  {
    $lookup:
    {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "author_details"
    }
  },
  { $unwind: "$author_details" }
  ])
}

async function getBlogFormDatabase(articleId) {
  return await POST_MODEL.findOne({ _id: articleId, deleted: false })
}

async function getBlogsFromDatabase() {
  return await POST_MODEL.find({ deleted: false })
}

async function updateBlogOnDatabase(articleId, title, slug, content) {
  const RESPONSE = await POST_MODEL.updateOne({ _id: articleId, deleted: false }, { $set: { title: title, slug: slug, content: content } })
  if (RESPONSE.acknowledged === true) {
    return true
  } else {
    return false
  }
}

async function softDeleteBlogFromDatabase(blogId) {
  return await POST_MODEL.updateOne({ _id: blogId }, { $set: { deleted: true } })
}

module.exports = { getLatestBlogs, getBlogContent, getBlogFormDatabase, getBlogsFromDatabase, updateBlogOnDatabase, softDeleteBlogFromDatabase }