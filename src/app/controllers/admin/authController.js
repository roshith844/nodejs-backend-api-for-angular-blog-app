const { verifyAdmin } = require("../../use-cases/admin/formdataVerification");
const {
  getDocumentId,
} = require("../../use-cases/get-data-from-database/get-user-details");
const {
  generateJwtTokens,
} = require("../../use-cases/token/jwt-token-management");
const {
  validateEmail,
  validatePassword,
} = require("../../use-cases/validation/form-validation");

module.exports = {
  loginAdmin: async (req, res, next) => {
    const { email, password } = req.body;
    if (!(validateEmail(email) || validatePassword(password))) {
      return res.status(400).json({
        message: "validation failed",
      });
    }
    const ADMIN_DETAILS = await verifyAdmin(email, password);
    if (!ADMIN_DETAILS)
      return res.json({ success: false, message: "Verification Failed" });
    const TOKENS = generateJwtTokens(ADMIN_DETAILS);
    // Set the access token as an HTTP-only cookie
    res.cookie("accessToken", TOKENS.accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 15 minutes
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", TOKENS.refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      success: true,
    });
  },
};
