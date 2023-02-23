const jwtTokenService = require('./../../data-access/jwt-token-service')
function generateJwtTokens(userDetails) {
    const ACCESS_TOKEN = jwtTokenService.generateAccessToken(userDetails)
    const REFRESH_TOKEN = jwtTokenService.generateRefreshToken(userDetails)
    return {
        "success": true,
        "accessToken": `Bearer ${ACCESS_TOKEN}`,
        "refreshToken": `Bearer ${REFRESH_TOKEN}`
    }
}

module.exports = { generateJwtTokens }