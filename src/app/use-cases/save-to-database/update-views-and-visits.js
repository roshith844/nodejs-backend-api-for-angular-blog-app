const { incrementPageViewInDatabase, incrementVisitsCountOnDatabase } = require("../../data-access/statistics/pageviews-and-visits-service")

async function incrementPageViews(articleId) {
    if (articleId === null) return
    if (await incrementPageViewInDatabase(articleId) === true) {
        return true
    } else {
        return false
    }
}

async function incrementVisitsCount() {
    if (await incrementVisitsCountOnDatabase() === true) {
        return true
    } else {
        return false
    }
}
module.exports = { incrementPageViews, incrementVisitsCount }