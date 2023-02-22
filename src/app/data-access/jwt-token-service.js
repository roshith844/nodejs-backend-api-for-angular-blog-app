const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = '4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a'
const REFRESH_TOKEN_SECRET = '4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a'

function generateAccessToken(userDetails) {
    return jwt.sign(userDetails, ACCESS_TOKEN_SECRET, { expiresIn: '1y' })
}

function generateRefreshToken(userDetails) {
    return jwt.sign(userDetails, ACCESS_TOKEN_SECRET)
}

function verifyJwtToken(token) {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
    })
    next()
}


module.exports = { generateAccessToken, verifyJwtToken, generateRefreshToken }