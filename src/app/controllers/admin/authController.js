const { verifyAdmin } = require("../../use-cases/admin/formdataVerification");
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
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", TOKENS.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month
    });
    res.json({
      success: true,
      role: ADMIN_DETAILS.role,
    });
  },
  logoutAdmin: async (req, res, next) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS)
      sameSite: "None",
    });

    // Set the refresh token as an HTTP-only cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS)
      sameSite: "None",
    });
    res.end();
  },
};
