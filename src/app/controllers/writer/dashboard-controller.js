const { getBlogStatusCountbyUserId } = require("../../use-cases/admin/posts/get-posts")

module.exports ={
    getStatistics:  async (req, res) => {
        const USER_ID = req.user
        const STATUS_COUNT = await getBlogStatusCountbyUserId( USER_ID )
        if (!STATUS_COUNT) return res.json({ "success": false })
        res.json({ "success": true, "statusCount": STATUS_COUNT })
    }
}