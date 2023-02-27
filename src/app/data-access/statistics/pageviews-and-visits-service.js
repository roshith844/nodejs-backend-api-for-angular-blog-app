const mongoose = require('mongoose')
const POST_MODEL = require('./../../models/post-schema')
const STATISTICS_MODEL = require('./../../models/ statistics')
async function incrementPageViewInDatabase(articleId) {
    const RESPONSE = await POST_MODEL.updateOne({ _id: articleId }, { $inc: { pageviews: 1 } })
    if (RESPONSE.acknowledged) {
        return true
    } else {
        return false
    }
}

async function incrementVisitsCountOnDatabase() {
    const RESPONSE = await STATISTICS_MODEL.updateOne({ user_category: "public" }, {
        $inc: {
            visits_count: 1
        }
    })

    if (RESPONSE.acknowledged) {
        return true
    } else {
        return false
    }
}

async function getPageViewsFromDatabase(articleId) {
    const RESPONSE = await POST_MODEL.findOne({ _id: articleId }, { pageviews: 1, _id: 0 })
    if (RESPONSE != null) {
        return RESPONSE.pageviews
    } else {
        return false
    }
}
module.exports = { incrementPageViewInDatabase, incrementVisitsCountOnDatabase, getPageViewsFromDatabase }