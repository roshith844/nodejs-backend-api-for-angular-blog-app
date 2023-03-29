const POST_MODEL = require('../models/post-schema')

async function getLatestBlogs(numberOfBlogs) {
  return await POST_MODEL.aggregate([
    { $match: { deleted: false, status: 'published' } },
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
  return await POST_MODEL.aggregate([{ $match: { slug: slug, deleted: false, status: 'published' } },

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

async function getBlogFormId(blogId) {
  const RESPONSE = await POST_MODEL.aggregate([
    { $match: { deleted: false, _id: blogId } },
    {
      $lookup:
      {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author_details"
      }
    },
    { $unwind: "$author_details" }])

  if (RESPONSE.length !== 0) return RESPONSE[0]

  return false
}

async function getBlogFormDatabase(articleId) {
  return await POST_MODEL.findOne({ _id: articleId, deleted: false })
}

async function getBlogsFromDatabase() {
  return await POST_MODEL.aggregate([
    {
      $match: { deleted: false }
    }
  ])
}

async function getBlogsOfWriterFromDatabase(writerId) {
  return await POST_MODEL.aggregate([
    { $match: {author: writerId, deleted: false } },
    {
        $lookup:
        {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author_details"
        }
    },
    { $unwind: "$author_details" },
    {
        $lookup:
        {
            from: "chats",
            localField: "_id",
            foreignField: "blogId",
            pipeline: [
                { $match: { is_read: false, type: 'admin-to-writer'} },
                {
                    $count: "count"
                }
            ],
            as: "unread"
        }
    },

])
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

module.exports = { getLatestBlogs, getBlogContent, getBlogFormDatabase, getBlogsFromDatabase, updateBlogOnDatabase, softDeleteBlogFromDatabase, getBlogFormId, getBlogsOfWriterFromDatabase }