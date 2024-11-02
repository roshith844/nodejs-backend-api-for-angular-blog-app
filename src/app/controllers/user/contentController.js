const {
  isArticleIsOnFavorites,
} = require("../../use-cases/interactions/favorites");
const {
  checkAndModifyFavoritesFeild,
} = require("../../use-cases/send-blog-cards/favorites");
const {
  decodeJwtToken,
} = require("../../use-cases/token/jwt-token-management");
const blogService = require("./../../use-cases/get-data-from-database/get-blog");
const {
  stringToObjectId,
} = require("../../use-cases/modify-data/change-format");

module.exports = {
  getBlogCards: async (req, res, next) => {
    let userId = null;
    let userEmail = null;
    const LATEST_BLOG_CARDS = await blogService.getBlogCards();
    const BlOG_CARDS_WITH_FAVORITE_STATUS = LATEST_BLOG_CARDS.map((item) => {
      item.isFavorite = false;
      return item;
    });

    const ACCESS_TOKEN = req.cookies.accessToken;
    let isUserLoggedIn = ACCESS_TOKEN ? true : false;
    if (ACCESS_TOKEN) {
      const DECODED_TOKEN = decodeJwtToken(ACCESS_TOKEN);
      if (DECODED_TOKEN != false) {
        isUserLoggedIn = true;
        userId = DECODED_TOKEN.id;
        userEmail = DECODED_TOKEN.email;
        if (!userEmail || !userId) {
          res.json({
            success: false,
          });
        }
      }
    }

    const USER_ID = stringToObjectId(userId);
    const FINAL_BLOG_CARDS = await checkAndModifyFavoritesFeild(
      BlOG_CARDS_WITH_FAVORITE_STATUS,
      USER_ID
    );

    res.json({
      success: true,
      cards: FINAL_BLOG_CARDS,
    });
  },

  getBlogContent: async (req, res, next) => {
    // get blog
    const BLOG = await blogService.getBlogContent(req.params.slug);
    const ARTICLE_ID = BLOG._id;
    if (!BLOG) {
      res.json({
        success: false,
      });
      return;
    }

    const ACCESS_TOKEN = req.cookies.accessToken;
    if (!ACCESS_TOKEN) {
      res.json({
        success: true,
        data: BLOG,
        loggedIn: false,
        isFavorite: false,
      });
      return;
    }

    const DECODED = decodeJwtToken(ACCESS_TOKEN);
    const USER_ID = stringToObjectId(DECODED.id);
    const isFavorite = await isArticleIsOnFavorites(USER_ID, ARTICLE_ID);
    res.json({
      success: true,
      data: BLOG,
      loggedIn: true,
      isFavorite: isFavorite,
    });
  },
};
