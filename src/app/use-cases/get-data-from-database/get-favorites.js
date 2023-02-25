const { getFavorites, checkUserExists } = require("../../data-access/interactions/favoritesService");

async function getFavoriteItems(userId) {

  // const FAVORITES = checkUserExists(userId)
  // if ( FAVORITES == null) {
  //   return false
  // } else if(FAVORITES) {

    const RESPONSE = await getFavorites(userId)
    if(RESPONSE.length === 0){
      return false
    }else{
      return RESPONSE[0].items
    }
    // if (RESPONSE == null || RESPONSE == []) {
    //   return false
    // }else{
    //   return RESPONSE.items
    // }

  // }


}

module.exports = { getFavoriteItems }