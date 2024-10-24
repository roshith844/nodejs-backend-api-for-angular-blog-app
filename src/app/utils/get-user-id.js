const jwtTokenManagement = require("./../use-cases/token/jwt-token-management");
const userDetailsManagement = require("../use-cases/get-data-from-database/get-user-details");

module.exports = {
  getUserIdAndEmail: async (authToken) => {
    const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(authToken);
    if (USER_EMAIL == false) {
      return false;
    }
    // Take userId from database
    const USER_ID = await userDetailsManagement.getDocumentId(USER_EMAIL);
    if (USER_ID == false) {
      return false;
    }

    return {
      email: USER_EMAIL,
      id: USER_ID,
    };
  },
};
