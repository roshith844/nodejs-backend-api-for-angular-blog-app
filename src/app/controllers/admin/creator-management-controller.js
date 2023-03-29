const { getAllCreatorsDetails } = require("../../use-cases/admin/creators/get-creators")
const { changeRoleToUser } = require("../../use-cases/admin/creators/update-creators")

module.exports = {
    getCreatorsData: async (req, res, next) => {
        const RESPONSE = await getAllCreatorsDetails()
        if (RESPONSE) return res.json({ "success": true, "data": RESPONSE })
        res.json({ "success": false })
    },
    dismissCreator: async (req, res, next) => {
        const { userId } = req.body
        if (await changeRoleToUser(userId) === true) return res.json({ "success": true })
        res.json({ "success": false })
    }
}