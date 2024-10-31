const POST_MODEL = require("./../../models/post-schema");
async function getBlogByIdFromDatabase(blogId) {
  return await POST_MODEL.aggregate([
    { $match: { deleted: false, _id: blogId } },
    { $project: { _id: 1, slug: 1, title: 1, content: 1, status: 1 } },
  ]);
}

async function getAllPostsWithAuthorDetails() {
  return await POST_MODEL.aggregate([
    { $match: { deleted: false } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author_details",
      },
    },
    { $unwind: "$author_details" },
    {
      $lookup: {
        from: "chats",
        localField: "_id",
        foreignField: "blogId",
        pipeline: [
          { $match: { is_read: false, type: "writer-to-admin" } },
          {
            $count: "count",
          },
        ],
        as: "unread",
      },
    },
    // {$unwind : '$unread' }
  ]);
}

async function changeStatusToPublished(blogId) {
  const RESPONSE = await POST_MODEL.updateOne(
    { _id: blogId },
    { status: "published" }
  );
  if (RESPONSE.acknowledged === true) return true;
  return false;
}

async function changeStatusToRejected(blogId) {
  const RESPONSE = await POST_MODEL.updateOne(
    { _id: blogId },
    { status: "rejected" }
  );
  if (RESPONSE.acknowledged === true) return true;
  return false;
}

async function getBlogStatusCountFromDatabase() {
  const RESPONSE = await POST_MODEL.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  if (RESPONSE.length === 0) return false;
  return RESPONSE;
}

async function getBlogStatusCountByIdFromDatabase(userId) {
  const RESPONSE = await POST_MODEL.aggregate([
    { $match: { deleted: false, author: userId } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

//   if (RESPONSE.length === 0) return false;
  return RESPONSE;
}

module.exports = {
  getAllPostsWithAuthorDetails,
  changeStatusToPublished,
  changeStatusToRejected,
  getBlogStatusCountFromDatabase,
  getBlogStatusCountByIdFromDatabase,
  getBlogByIdFromDatabase,
};
