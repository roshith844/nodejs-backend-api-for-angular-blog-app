const { isUniqueSlug } = require("../../data-access/validation/check-uniquity")

async function validateSlug(slug) {
    if (slug === null || slug.length === 0 || typeof slug !== 'string') return false
    if (await isUniqueSlug(slug) === true) return true
    return false
}

module.exports = {
    validateSlug
}