const { getUserRole, getUserDetails } = require("../use-cases/get-data-from-database/get-user-details")
const { editProfilebyId } = require("../use-cases/save-to-database/update-user-data")
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
    },

    editProfile: async (req, res) => {
        const USER_ID = req.user
        const { name, email, phone } = req.body
        if (await editProfilebyId(USER_ID, name, email, phone) === true) {
            res.json({ "success": true })
        } else {
            res.json({ "success": false })
        }
    },

    editProfileImage: async (req, res) => {
        console.log('uploading')
        console.log(req.file)
        console.log(req.body)
    }
}