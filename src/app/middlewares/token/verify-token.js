const jwt = require("jsonwebtoken");
const {
  getUserRole,
} = require("../../use-cases/get-data-from-database/get-user-details");
const {
  stringToObjectId,
} = require("../../use-cases/modify-data/change-format");
// const ACCESS_TOKEN_SECRET =
//   "4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a";
// const REFRESH_TOKEN_SECRET =
//   "4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a";
const ACCESS_TOKEN_SECRET =
  "4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a";
const REFRESH_TOKEN_SECRET =
  "4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a";

module.exports = {
  verifyUser: (req, res, next) => {
    const ACCESS_TOKEN = req.cookies.accessToken;
    console.log("I am ", ACCESS_TOKEN);
    if (!ACCESS_TOKEN) {
      // No token available, respond with 401 Unauthorized
      return res.status(401).send({ message: "Token required" });
    }
    // const TOKEN = req.headers.authorization;
    // if (!ACCESS_TOKEN) {
    //   return res.status(400).send({
    //     token: false,
    //     message: "No token provided",
    //   });
    // }

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
      // Check if token expired
      // if (error.name === "TokenExpiredError") {
      //   throw { status: 401, message: "Token expired" };
      // } else {
      //   throw { status: 401, message: "Invalid token" };
      // }

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
        console.log("DECODED", DECODED);
        // const RESPONSE = await getUserRole(USER_ID)
        // console.log(RESPONSE)
        // if (!RESPONSE) return res.status(400).send({ token: false, message: 'invalid token', })
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
