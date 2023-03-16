const { getCreatorsDetailsFromDatabase } = require("../../../data-access/admin/creators-service")

async function getAllCreatorsDetails() {
    const CREATOR = await getCreatorsDetailsFromDatabase()
    if ( CREATOR) return  CREATOR
    return false
}

module.exports = {
    getAllCreatorsDetails
}