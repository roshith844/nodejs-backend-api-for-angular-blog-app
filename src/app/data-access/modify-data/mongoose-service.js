const mongoose = require('mongoose')

function changeToMongooseObjectId(idAsString) {
    const OBJECT_ID = mongoose.Types.ObjectId(idAsString)
    return OBJECT_ID
}

module.exports = { changeToMongooseObjectId }