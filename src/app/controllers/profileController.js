const cloudinary = require("../config/cloudinary");
const {
  getUserRole,
  getUserDetails,
} = require("../use-cases/get-data-from-database/get-user-details");
const {
  editProfilebyId,
} = require("../use-cases/save-to-database/update-user-data");
const tokenManagement = require("../use-cases/token/jwt-token-management");
const {
  saveUserProfilePictureUrl,
} = require("../use-cases/upload-profile-picture/save-image-url");
const jwtTokenManagement = require("../use-cases/token/jwt-token-management");
const userDetailsManagement = require("../use-cases/get-data-from-database/get-user-details");

// decodeJwtToken
module.exports = {
  getProfile: async (req, res, next) => {
    // const USER_ID = req.user
    const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(
      req.headers.authorization
    );
    if (USER_EMAIL == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }
    const USER_ID = await userDetailsManagement.getDocumentId(USER_EMAIL);
    if (USER_ID == false) {
      res.status(403).json({
        success: false,
      });
      return;
    }

    const USER_DETAILS = await getUserDetails(USER_ID);
    console.log(USER_ID, USER_DETAILS);
    if (
      USER_DETAILS === false ||
      USER_DETAILS === null ||
      USER_DETAILS.length === 0
    ) {
      res.json({
        success: false,
      });
      res.end();
      return;
    } else {
      res.json({
        success: true,
        name: USER_DETAILS.name,
        email: USER_DETAILS.email,
        phone: USER_DETAILS.phone,
        image: USER_DETAILS.profie_picture_url,
        role: USER_DETAILS.role,
      });
    }
  },

  editProfile: async (req, res, next) => {
    const USER_ID = req.user;
    const { name, email, phone } = req.body;
    if ((await editProfilebyId(USER_ID, name, email, phone)) === true) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  },

  editProfileImage: async (req, res, next) => {
    // Uploads to cloudinary
    const RESULT = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${req.user}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    const USER_ID = req.user;
    if (!RESULT)
      return res.json(
        res.json({ success: false, message: "not uploaded to cloudinary" })
      );

    const IMAGE_URL = RESULT.url;

    if ((await saveUserProfilePictureUrl(USER_ID, IMAGE_URL)) === true) {
      res.json({ success: true, data: IMAGE_URL });
    } else {
      res.json({ success: false });
    }
  },
};
