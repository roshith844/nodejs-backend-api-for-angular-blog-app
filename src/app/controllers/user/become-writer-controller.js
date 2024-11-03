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
    const USER_DETAILS = await userDetailsManagement.fetchUserDetailsFromId(USER_ID);
    const TOKENS = jwtTokenManagement.generateJwtTokens(USER_DETAILS);
    
    res.cookie("accessToken", TOKENS.accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 minutes
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", TOKENS.refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
    });

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
