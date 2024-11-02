const {
  updateRoleToWriter,
} = require("../../use-cases/save-to-database/update-user-data");
const jwtTokenManagement = require("../../use-cases/token/jwt-token-management");
const userDetailsManagement = require("./../../use-cases/get-data-from-database/get-user-details");

module.exports = {
  applyForWriterRole: async (req, res, next) => {
    const USER_ID = req.user.id;
    const IS_UPDATED = await updateRoleToWriter(USER_ID);
    // get userData and create modify cookie
    //..

    if (IS_UPDATED) {
      res.json({
        success: true,
        isWriter: true,
      });
    } else {
      res.json({ success: false, isWriter: false });
    }
  },
};
