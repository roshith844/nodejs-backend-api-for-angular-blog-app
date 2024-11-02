const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET =
  "4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a";
const jwtTokenGenerationService = require("../use-cases/token/jwt-token-management");
const userDetailsManagement = require("../use-cases/get-data-from-database/get-user-details");
const jwtTokenService = require("../data-access/jwt-token-service");
module.exports = {
  refreshToken: async (req, res) => {
    const { refreshToken } = req.cookies; // Get refresh token from cookies
    if (!refreshToken) {
      return res.sendStatus(401); // No refresh token provided
    }
    // if refresh token , decode
    const TOKEN_PAYLOAD =
      jwtTokenGenerationService.decodeJwtToken(refreshToken);
    const USER_DETAILS = await userDetailsManagement.fetchUserDetails(
      TOKEN_PAYLOAD.email
    );
    if (!USER_DETAILS)
      return res.json({ success: false, message: "user not found" });
    if (USER_DETAILS.status === "blocked")
      return res.json({ success: false, message: "user Blocked" });
    // get payload, id ,
    // get UserDetails from DB
    const { role, _id, email, status } = USER_DETAILS;
    const newPayload = {
      id: _id,
      role,
      email,
      status,
    };
    const ACCESS_TOKEN = jwtTokenService.generateAccessToken(newPayload);
    res.cookie("accessToken", `Bearer ${ACCESS_TOKEN}`, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 minutes
    });
    res.end();
  },
};
