const { getPageViewsFromDatabase } = require("../../data-access/statistics/pageviews-and-visits-service")

async function getPageViewsOfArticle(articleId) {
    const PAGE_VIEWS = await getPageViewsFromDatabase(articleId)
    if (PAGE_VIEWS != null || PAGE_VIEWS != false) {
        return PAGE_VIEWS
    } else {
        return false
    }
}
module.exports = { getPageViewsOfArticle }