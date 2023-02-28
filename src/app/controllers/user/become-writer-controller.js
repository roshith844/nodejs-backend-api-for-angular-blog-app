const { updateRoleToWriter } = require("../../use-cases/save-to-database/update-user-data")

module.exports = {
    applyForWriterRole: async (req, res) => {
        const USER_ID = req.user
        const IS_UPDATED = await updateRoleToWriter(USER_ID)
        if (IS_UPDATED) {
            res.json({
                "success": true,
                "isWriter": true
            })
        } else {
            res.json({ "success": false, "isWriter": false })

        }

    }
}