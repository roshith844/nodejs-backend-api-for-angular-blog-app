const jwtTokenService = require('./../../data-access/jwt-token-service')
function generateJwtTokens(userDetails) {
    const ACCESS_TOKEN = jwtTokenService.generateAccessToken(userDetails)
    const REFRESH_TOKEN = jwtTokenService.generateRefreshToken(userDetails)
    return {
        "status": true,
        "accessToken": ACCESS_TOKEN,
        "refreshToken": REFRESH_TOKEN
    }
}

module.exports = { generateJwtTokens }