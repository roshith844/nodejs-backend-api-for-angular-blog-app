const jwtTokenService = require('../../data-access/jwt-token-service')
function generateJwtTokens(userDetails) {
    const ACCESS_TOKEN = jwtTokenService.generateAccessToken(userDetails)
    const REFRESH_TOKEN = jwtTokenService.generateRefreshToken(userDetails)
    return {
        "success": true,
        "accessToken": `Bearer ${ACCESS_TOKEN}`,
        "refreshToken": `Bearer ${REFRESH_TOKEN}`
    }
}

function getUserEmailFromToken(token) {
    const DECODED_TOKEN = jwtTokenService.verifyJwtToken(token)
    if (DECODED_TOKEN) {
        return DECODED_TOKEN.email
    } else {
        false
    }
}

function decodeJwtToken(token) {

    const DECODED_TOKEN = jwtTokenService.verifyJwtToken(token)
    if (DECODED_TOKEN) {
        return DECODED_TOKEN
    } else {
        false
    }
}

module.exports = { generateJwtTokens, getUserEmailFromToken, decodeJwtToken }