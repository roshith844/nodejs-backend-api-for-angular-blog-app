const formValidation = require("../../use-cases/validation/form-validation");
const formDataVerificationService = require("./../../use-cases/verification/formData-verification");
const jwtTokenGenerationService = require("../../use-cases/token/jwt-token-management");
const hashingService = require("./../../use-cases/hashing/password-hashing");
const saveToDatabaseService = require("./../../use-cases/save-to-database/save-user-data");
const {
  getDocumentId,
  getUserRoleAndStatus,
} = require("../../use-cases/get-data-from-database/get-user-details");
const {
  getUserProfileData,
} = require("../../use-cases/get-data-from-database/get-user-details");
const jwtTokenManagement = require("../../use-cases/token/jwt-token-management");
const userDetailsManagement = require("./../../use-cases/get-data-from-database/get-user-details");
const { getUserAuthDetails } = require("../../data-access/userService");
const {
  stringToObjectId,
} = require("../../use-cases/modify-data/change-format");
const {
  decodeJwtToken,
} = require("../../use-cases/token/jwt-token-management");

// decodeJwtToken
module.exports = {
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    // Validation
    if (
      !(
        formValidation.validateEmail(email) ||
        formValidation.validatePassword(password)
      )
    ) {
      res.status(400).json({
        message: "validation failed",
      });
      return;
    }

    const VERIFICATION_SUCCESS = await formDataVerificationService.verifyUser(
      email,
      password
    );
    // const USER_ID = await getDocumentId(email);
    if (VERIFICATION_SUCCESS) {
      const USER_DETAILS = await userDetailsManagement.fetchUserDetails(email);
      if (!USER_DETAILS)
        return res.json({ success: false, message: "user not found" });
      if (USER_DETAILS.status === "blocked")
        return res.json({ success: false, message: "user Blocked" });

      const TOKENS = jwtTokenGenerationService.generateJwtTokens(USER_DETAILS);
      res.cookie("accessToken",  TOKENS.accessToken, {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS)
        sameSite: "Lax",
        maxAge:  60 * 24 * 60 * 60 * 1000, // 60 minutes
      });

      // Set the refresh token as an HTTP-only cookie
      res.cookie("refreshToken", TOKENS.refreshToken, {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS)
        sameSite: "Lax",
        maxAge:  60 * 24 * 60 * 60 * 1000, // 60 days
      });
      res.json(TOKENS);
    } else {
      res.json({
        success: false,
        message: "invalid Credentials",
      });
    }
  },

  signupUser: async (req, res, next) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    if ((await formValidation.checkUserExistance(email)) == true) {
      res.json({
        success: false,
      });
    } else if (
      password === confirmPassword &&
      formValidation.vallidateName(name) &&
      formValidation.validateEmail(email) &&
      formValidation.validatePhoneNumber(phone) &&
      formValidation.validatePassword(password)
    ) {
      const HASHED_PASSWORD = await hashingService.hashPassword(password);
      await saveToDatabaseService.saveSignupFormData({
        name: name,
        email: email,
        phone: phone,
        password: HASHED_PASSWORD,
      });
      res.json({
        success: true,
      });
    }
  },
  getUserStatus: async (req, res, next) => {
    let isLoggedIn = false;
    let userId;
    let nameOfUser = "unknown";
    const ACCESS_TOKEN = req.cookies.accessToken;
    console.log("access token", ACCESS_TOKEN)
    if (ACCESS_TOKEN) isLoggedIn = ACCESS_TOKEN ? true : false;
    else {
      res.json({
        role: "public",
        loggedIn: false,
      });
      return;
    }

    const DECODED = decodeJwtToken(ACCESS_TOKEN);
    const USER_ID = stringToObjectId(DECODED.id);

    // if user, gets userdata form id
    const USER_INFO = await getUserProfileData(stringToObjectId(USER_ID));
    if (!USER_INFO) {
      res.status(403).json({
        success: false,
        message: "something went wrong",
      });
      return;
    }

    res.json({
      userId: USER_INFO.id,
      role: USER_INFO.role,
      name: USER_INFO.name,
      image: USER_INFO.profilePictureUrl,
      loggedIn: isLoggedIn,
    });
  },
};
