const { changeToMongooseObjectId } = require("../../data-access/modify-data/mongoose-service")

function stringToObjectId( idAsString ) {
   const ID_AS_OBJECT_ID  = changeToMongooseObjectId(idAsString)
  if(ID_AS_OBJECT_ID === null || ID_AS_OBJECT_ID === false) return false
  return ID_AS_OBJECT_ID
}

module.exports = { stringToObjectId }