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
      secure: true,
      sameSite: "None",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 15 minutes
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", TOKENS.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      success: true,
    });
  },
  logoutAdmin: async (req, res, next) => {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS)
      sameSite: "None",
      expires: new Date(0),
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    });
    res.end();
  },
};
