const {
  softDeleteComment,
} = require("../../../use-cases/delete-data/delete-comments");
const {
  addCommentbyBlogId,
  getCommentsByBlogId,
} = require("../../../use-cases/interactions/comments");
const getUserIdHelper = require("../../../utils/get-user-id");
module.exports = {
  addComment: async (req, res, next) => {
    // const USER_DATA = await getUserIdHelper.getUserIdAndEmail(
    //   req.headers.authorization
    // );
    const USER_ID = req.user.id;
    if (USER_ID == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }
    const { blogId, comment } = req.body;
    const RESPONSE = await addCommentbyBlogId(blogId, USER_ID, comment);
    if (RESPONSE != false) res.json({ success: true, data: RESPONSE });
  },
  getAllComments: async (req, res, next) => {
    const BLOG_ID = req.params.id;
    const COMMENTS = await getCommentsByBlogId(BLOG_ID);
    if (COMMENTS === false) {
      res.json({ success: false });
      res.end();
      return;
    }

    res.json({
      success: true,
      comments: COMMENTS,
    });
  },
  deleteComment: async (req, res) => {
    // const USER_DATA = await getUserIdHelper.getUserIdAndEmail(
    //   req.headers.authorization
    // );
    const USER_ID = req.user.id;
    if (USER_ID == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }
    const BLOG_ID = req.params.blogId;
    const COMMENT_ID = req.params.commentId;
    if ((await softDeleteComment(BLOG_ID, COMMENT_ID, USER_ID)) === true) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  },
};
