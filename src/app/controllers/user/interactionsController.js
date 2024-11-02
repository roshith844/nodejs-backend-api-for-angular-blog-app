const favoritesService = require("./../../use-cases/interactions/favorites");
const jwtTokenManagement = require("../../use-cases/token/jwt-token-management");
const userDetailsManagement = require("./../../use-cases/get-data-from-database/get-user-details");
const {
  getFavoriteItems,
} = require("../../use-cases/get-data-from-database/get-favorites");
const {
  getBlogCardFromArticleId,
} = require("../../use-cases/get-data-from-database/get-blog");
const {
  stringToObjectId,
} = require("../../use-cases/modify-data/change-format");

module.exports = {
  addOrRemoveFromFavorites: async (req, res, next) => {
    const { articleId } = req.body;

    const USER_ID = stringToObjectId(req.user.id);

    // check user has favorites doc
    const USER_HAS_FAVORITES_COLLECTIONS =
      await favoritesService.checkUserHasFavoritesCollection(USER_ID);

    // if favorite exists push articleId to items
    if (USER_HAS_FAVORITES_COLLECTIONS == true) {
      const ARTICLE_EXISTS = await favoritesService.isArticleIsOnFavorites(
        USER_ID,
        articleId
      );
      if (ARTICLE_EXISTS == true) {
        // remove from favorites
        await favoritesService.RemoveFromFavorites(USER_ID, articleId);

        res.json({
          success: true,
          status: "remove",
        });
      } else {
        await favoritesService.addToFavorites(USER_ID, articleId);
        res.json({
          success: true,
          status: "add",
        });
      }
    } else {
      // if not create new favorites and push
      if (
        (await favoritesService.createFavoritesAndAdd(USER_ID, articleId)) ===
        true
      ) {
        res.json({
          success: true,
          status: "add",
        });
      } else {
        res.status(403).json({
          success: false,
        });
      }
    }
  },
  getFavoritesCards: async (req, res, next) => {
    // get user email from token
    const USER_ID = req.user.id;
    // get all cards data
    const FAVORITE_ITEMS_IDS = await getFavoriteItems(USER_ID);

    if (FAVORITE_ITEMS_IDS == false) {
      res.json({
        success: false,
      });
    } else {
      const FAVORITE_CARDS = await getBlogCardFromArticleId(FAVORITE_ITEMS_IDS);
      if (FAVORITE_CARDS != null) {
        res.json({
          success: true,
          data: FAVORITE_CARDS,
        });
      }
    }
  },
};
