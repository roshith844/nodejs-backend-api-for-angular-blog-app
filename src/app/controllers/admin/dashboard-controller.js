const { getBlogStatusCount } = require("../../use-cases/admin/posts/get-posts")

module.exports = {
    getStatistics: async (req, res) => {
        const STATUS_COUNT = await getBlogStatusCount()
        if (!STATUS_COUNT) return res.json({ "success": false })
        res.json({ "success": true, "statusCount": STATUS_COUNT })
    }
}