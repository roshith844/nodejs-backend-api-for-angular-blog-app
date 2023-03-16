const { getAllCreatorsDetails } = require("../../use-cases/admin/creators/get-creators")

module.exports = {
    getCreatorsData: async (req, res) => {
        const RESPONSE = await getAllCreatorsDetails()
        if (RESPONSE) return res.json({ "success": true, "data": RESPONSE })
        res.json({ "success": false })
    }
}