const { getUserRole } = require("../use-cases/get-data-from-database/get-user-details")
const tokenManagement = require("../use-cases/token/jwt-token-management")
// decodeJwtToken
module.exports = {
    getUserDetails: async (req, res) => {
        let isLoggedIn = false
        let userId

        // Decodes token 
        if (req.headers.hasOwnProperty('authorization')) {
            if (req.headers.authorization != 'null') {
                const TOKEN = req.headers.authorization
                const DECODED_TOKEN = tokenManagement.decodeJwtToken(TOKEN)
                if (DECODED_TOKEN != false) {
                    isLoggedIn = true
                    userId = DECODED_TOKEN.id
                }
            }

        } else {
            // if no token or invalid set as public user
            res.json({
                "role": 'public',
                "loggedIn": false

            })
            res.end()
            return
        }

        // if user, gets userRole form id
        const USER_ROLE = await getUserRole(userId)

        // if token valid set userloggin true
        if (userId != null || USER_ROLE != null) {
            res.json({
                "role": USER_ROLE,
                "loggedIn": isLoggedIn,
            })
        } else {
            res.json({
                "role": 'public',
                "loggedIn": false
            })
        }

    }
}