const jwt = require("jsonwebtoken");
const {
  stringToObjectId,
} = require("../../use-cases/modify-data/change-format");
require("dotenv").config({
  path: require("path").resolve(__dirname + "../../../../.env"),
});
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
module.exports = {
  verifyUser: (req, res, next) => {
    const ACCESS_TOKEN = req.cookies.accessToken;
    if (!ACCESS_TOKEN) {
      // No token available, respond with 401 Unauthorized
      return res.status(401).send({ message: "Token required" });
    }

    try {
      const DECODED = jwt.verify(
        ACCESS_TOKEN.split(" ")[1],
        ACCESS_TOKEN_SECRET
      );

      if (DECODED) {
        const USER_ID = stringToObjectId(DECODED.id);
        const ROLE = DECODED.role;
        if (ROLE === "user" || ROLE === "writer") {
          req.user = {
            id: USER_ID,
            email: DECODED.email,
          };
        } else {
          return res.status(400).send({
            token: false,
            message: "invalid token",
          });
        }
        next();
      } else {
        return res.status(400).send({
          token: false,
          message: "invalid token",
        });
      }
    } catch (error) {
      return res.status(401).send({
        token: false,
        message: "invalid token",
      });
    }
  },
  verifyAdmin: (req, res, next) => {
    const ACCESS_TOKEN = req.cookies.accessToken;
    if (!ACCESS_TOKEN) {
      // No token available, respond with 401 Unauthorized
      return res.status(401).send({ message: "Token required" });
    }
    // const ACCESS_TOKEN = req.headers.authorization;
    if (!ACCESS_TOKEN) {
      return res.status(400).send({
        token: false,
        message: "No token provided",
      });
    }
    try {
      const DECODED = jwt.verify(
        ACCESS_TOKEN.split(" ")[1],
        ACCESS_TOKEN_SECRET
      );
      if (DECODED) {
        const ADMIN_ID = stringToObjectId(DECODED.id);
        const ROLE = DECODED.role;
        if (ROLE === "admin") {
          req.admin = {
            id: ADMIN_ID,
            email: DECODED.email,
          };
        } else {
          return res.status(400).send({
            token: false,
            message: "invalid token",
          });
        }
        next();
      } else {
        return res.status(400).send({
          token: false,
          message: "invalid token",
        });
      }
    } catch (error) {
      return res.status(400).send({
        token: false,
        message: "invalid token",
      });
    }
  },
  verifyWriter: async (req, res, next) => {
    const ACCESS_TOKEN = req.cookies.accessToken;
    if (!ACCESS_TOKEN) {
      // No token available, respond with 401 Unauthorized
      return res.status(401).send({ message: "Token required" });
    }
    try {
      const DECODED = jwt.verify(
        ACCESS_TOKEN.split(" ")[1],
        ACCESS_TOKEN_SECRET
      );
      if (DECODED) {
        const USER_ID = stringToObjectId(DECODED.id);
        const ROLE = DECODED.role;
        if (ROLE === "writer") {
          req.user = {
            id: USER_ID,
            email: DECODED.email,
          };

          next();
        } else {
          return res.status(400).send({
            token: false,
            message: "access restricted",
          });
        }
      } else {
        return res.status(400).send({
          token: false,
          message: "invalid token",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        token: false,
        message: "invalid token",
      });
    }
  },
};
