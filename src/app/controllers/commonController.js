const { getUserRole, getUserDetails } = require("../use-cases/get-data-from-database/get-user-details")
const tokenManagement = require("../use-cases/token/jwt-token-management")
// decodeJwtToken
module.exports = {
    getProfile: async (req, res) => {
        const USER_ID = req.user
        const USER_DETAILS = await getUserDetails(USER_ID)
        if (USER_DETAILS === false || USER_DETAILS === null || USER_DETAILS.length === 0) {
            res.json({
                "success": false
            })
            res.end()
            return
        } else {
            res.json({
                "success": true,
                "name": USER_DETAILS.name,
                "email": USER_DETAILS.email,
                "phone": USER_DETAILS.phone,
                "role": USER_DETAILS.role
            })
        }
    }
}