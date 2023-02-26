const { incrementPageViews, incrementVisitsCount } = require("../../use-cases/save-to-database/update-views-and-visits")

module.exports = {
    incrementPageView: async (req, res) => {
        const { articleId, incrementVisits } = req.body
        let isPageViewUpdated = false
        let isVisitsCountUpdated = false

        // increment pageviews
        const isPageViewsIncremented = await incrementPageViews(articleId)
        if (isPageViewsIncremented === true) {
            isPageViewUpdated = true
        }

        if (incrementVisits == false) {
            isVisitsCountUpdated = true
        } else if (incrementVisits == true) {
            // increment visits count
            const isVisitCountIncremented = await incrementVisitsCount()
            if (isVisitCountIncremented === true) {
                console.log("visits updated")
                isVisitsCountUpdated = true
            }
        }


        if ((isVisitsCountUpdated === true) && (isPageViewUpdated === true)) {
            res.json({
                "success": true
            })
        } else {
            res.json({
                "success": false
            })
        }

    }
}