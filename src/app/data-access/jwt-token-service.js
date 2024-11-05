const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: require("path").resolve(__dirname + "./../../../.env"),
});
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function generateAccessToken(userDetails) {
  return jwt.sign(userDetails, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}

function generateRefreshToken(userDetails) {
  return jwt.sign(userDetails, REFRESH_TOKEN_SECRET, { expiresIn: "365d" });
}

function verifyJwtToken(token) {
  return jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET);
}

module.exports = { generateAccessToken, verifyJwtToken, generateRefreshToken };
