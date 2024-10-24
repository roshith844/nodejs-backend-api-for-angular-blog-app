const {
  updateRoleToWriter,
} = require("../../use-cases/save-to-database/update-user-data");
const jwtTokenManagement = require('../../use-cases/token/jwt-token-management')
const userDetailsManagement = require('./../../use-cases/get-data-from-database/get-user-details')

module.exports = {
  applyForWriterRole: async (req, res, next) => {
    const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(
      req.headers.authorization
    );
    if (USER_EMAIL == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }
    // Take userId from database
    const USER_ID = await userDetailsManagement.getDocumentId(USER_EMAIL);
    if (USER_ID == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }

    const IS_UPDATED = await updateRoleToWriter(USER_ID);
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
