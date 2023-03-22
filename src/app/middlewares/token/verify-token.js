const jwt = require('jsonwebtoken')
const { getUserRole } = require('../../use-cases/get-data-from-database/get-user-details')
const ACCESS_TOKEN_SECRET = '4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a'
const REFRESH_TOKEN_SECRET = '4c2beacdb5767f39c44536f4c0207fced37b6322a2ad564a177a5361d41b63044a9ee0389d8f71f894c72fd53ffb09d1d7325143ca2078e44c0d673692aaaf9a'

module.exports = {
    verifyUser: (req, res, next) => {
        const TOKEN = req.headers.authorization
        if (!TOKEN) {
            return res.status(400).send({
                token: false,
                message: 'No token provided',
            });
        }

        try {
            const DECODED = jwt.verify(TOKEN.split(' ')[1], ACCESS_TOKEN_SECRET);
            if (DECODED) {
                req.user = DECODED.id
                next();
            } else {
                return res.status(400).send({
                    token: false,
                    message: 'invalid token',
                });
            }
        } catch (error) {
            return res.status(400).send({
                token: false,
                message: 'invalid token',
            });
        }
    },
    verifyAdmin: (req, res, next) => {
        const TOKEN = req.headers.authorization
        if (!TOKEN) {
            return res.status(400).send({
                token: false,
                message: 'No token provided',
            });
        }
        try {
            const DECODED = jwt.verify(TOKEN.split(' ')[1], ACCESS_TOKEN_SECRET)
            if (DECODED) {
                req.admin = DECODED.id
                next();
            } else {
                return res.status(400).send({
                    token: false,
                    message: 'invalid token',
                });
            }
        } catch (error) {
            return res.status(400).send({
                token: false,
                message: 'invalid token',
            });
        }
    },
    verifyWriter: async (req, res, next) => {
        const TOKEN = req.headers.authorization
        if (!TOKEN) {
            return res.status(400).send({
                token: false,
                message: 'No token provided',
            });
        }
        try {
            const DECODED = jwt.verify(TOKEN.split(' ')[1], ACCESS_TOKEN_SECRET)
            if (DECODED) {
                let ADMIN_ID = DECODED.id
                const RESPONSE = await getUserRole(ADMIN_ID)
                if (!RESPONSE) return res.status(400).send({ token: false, message: 'invalid token', })
                if (RESPONSE.role === 'writer') {
                    req.user = DECODED.id
                    next()
                } else {
                    return res.status(400).send({
                        token: false,
                        message: 'access restricted',
                    })
                }

            } else {
                return res.status(400).send({
                    token: false,
                    message: 'invalid token',
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                token: false,
                message: 'invalid token',
            });
        }
    }

}