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
    const TOKEN = req.headers.authorization;
    if (!TOKEN) {
      return res.status(400).send({
        token: false,
        message: "No token provided",
      });
    }

    try {
      const DECODED = jwt.verify(TOKEN.split(" ")[1], ACCESS_TOKEN_SECRET);
      if (DECODED) {
        const USER_ID = stringToObjectId(DECODED.id);
        const ROLE = DECODED.role;
        if (ROLE === "user") {
          req.user = {
            id: USER_ID,
            email: DECODED.email,
          };
        }else {
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
  verifyAdmin: (req, res, next) => {
    console.log('running token aurtorizatiobn')
    const TOKEN = req.headers.authorization;
    console.log(TOKEN)
    if (!TOKEN) {
      return res.status(400).send({
        token: false,
        message: "No token provided",
      });
    }
    try {
      const DECODED = jwt.verify(TOKEN.split(" ")[1], ACCESS_TOKEN_SECRET);
      console.log(DECODED)
      if (DECODED) {
        const ADMIN_ID = stringToObjectId(DECODED.id);
        const ROLE = DECODED.role;
        if (ROLE === "admin") {
          req.admin = {
            id: ADMIN_ID,
            email: DECODED.email,
          };
        }else {
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
    const TOKEN = req.headers.authorization;
    console.log(TOKEN);
    if (!TOKEN) {
      return res.status(400).send({
        token: false,
        message: "No token provided",
      });
    }
    try {
      const DECODED = jwt.verify(TOKEN.split(" ")[1], ACCESS_TOKEN_SECRET);
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
          console.log(req.user);

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
