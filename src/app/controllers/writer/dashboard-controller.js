const {
  getBlogStatusCountbyUserId,
} = require("../../use-cases/admin/posts/get-posts");
const jwtTokenManagement = require("../../use-cases/token/jwt-token-management");
const userDetailsManagement = require("./../../use-cases/get-data-from-database/get-user-details");

module.exports = {
  getStatistics: async (req, res, next) => {
    const USER_ID = req.user.id;
    if (USER_ID == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }
    const STATUS_COUNT = await getBlogStatusCountbyUserId(USER_ID);
    if (!STATUS_COUNT) return res.json({ success: false });
    res.json({ success: true, statusCount: STATUS_COUNT });
  },
};
