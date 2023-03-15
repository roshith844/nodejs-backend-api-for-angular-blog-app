const { blockUserById } = require("../../use-cases/admin/users/update-user")

module.exports = {
    blockUser: async (req, res) => {
        const { userId } = req.body
        const IS_BLOCKED = await blockUserById(userId)
        if (IS_BLOCKED === true) return res.json({ "success": true })
        res.json({ "success": false })
    }
}