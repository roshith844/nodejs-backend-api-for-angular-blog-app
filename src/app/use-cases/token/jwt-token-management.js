const jwtTokenService = require("../../data-access/jwt-token-service");
function generateJwtTokens(userDetails) {
  const { role, email, status } = userDetails;
  const PAYLOAD = {
    id: userDetails._id,
    role,
    email,
    status,
  };
  const ACCESS_TOKEN = jwtTokenService.generateAccessToken(PAYLOAD);
  const REFRESH_TOKEN = jwtTokenService.generateRefreshToken(PAYLOAD);
  return {
    success: true,
    role: userDetails.role,
    accessToken: `Bearer ${ACCESS_TOKEN}`,
    refreshToken: `Bearer ${REFRESH_TOKEN}`,
  };
}


function getUserEmailFromToken(token) {
  if (token === null) return false;
  const DECODED_TOKEN = jwtTokenService.verifyJwtToken(token);
  if (DECODED_TOKEN) {
    return DECODED_TOKEN.email;
  } else {
    false;
  }
}

function decodeJwtToken(token) {
  if (token === null || token === "null") return false;
  const DECODED_TOKEN = jwtTokenService.verifyJwtToken(token);
  if (DECODED_TOKEN) {
    return DECODED_TOKEN;
  } else {
    false;
  }
}

module.exports = { generateJwtTokens, getUserEmailFromToken, decodeJwtToken };
