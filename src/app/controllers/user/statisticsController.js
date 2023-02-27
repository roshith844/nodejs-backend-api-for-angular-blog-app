const { getPageViewsOfArticle } = require("../../use-cases/get-data-from-database/get-statistics-data")
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

    },

    getPageViewsCount: async (req, res) => {
        const ARTICLE_ID = req.params.articleId

        const PAGE_VIEWS = await getPageViewsOfArticle(ARTICLE_ID)
        if (PAGE_VIEWS != false) {
            res.json({
                "success": true,
                "views": PAGE_VIEWS
            })
        } else {
            res.json({
                "success": true,
                "views": PAGE_VIEWS
            })
        }
    }
}