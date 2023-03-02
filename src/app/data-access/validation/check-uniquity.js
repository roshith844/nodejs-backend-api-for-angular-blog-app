const mongoose = require('mongoose')
const POST_MODEL = require('./../../models/post-schema')

async function isUniqueSlug(slug) {
    const RESPONSE = await POST_MODEL.exists({ slug: slug })

    if (RESPONSE === null) {
        return true
    } else if (RESPONSE.hasOwnProperty('_id')) {
        return false
    }

}
module.exports = {
    isUniqueSlug
}