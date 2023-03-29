const { getAllUserDetails } = require("../../use-cases/admin/users/get-user")
const { blockUserById, UnBlockUserById } = require("../../use-cases/admin/users/update-user")

module.exports = {
    blockUser: async (req, res, next) => {
        const { userId } = req.body
        const IS_BLOCKED = await blockUserById(userId)
        if (IS_BLOCKED === true) return res.json({ "success": true })
        res.json({ "success": false })
    },
    unBlockUser: async (req, res, next) => {
        const { userId } = req.body
        const IS_UNBLOCKED = await UnBlockUserById(userId)
        if (IS_UNBLOCKED === true) return res.json({ "success": true })
        res.json({ "success": false })
    },
    getUserData: async (req, res, next) => {
        const RESPONSE = await getAllUserDetails()
        if (RESPONSE) return res.json({ "success": true, "data": RESPONSE })
        res.json({ "success": false })
    }

}