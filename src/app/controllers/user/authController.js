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
    const USER_ID = await getDocumentId(email);
    if (VERIFICATION_SUCCESS) {
      const USER_DETAILS = await userDetailsManagement.fetchUserDetails(USER_ID);
      if (!USER_DETAILS)
        return res.json({ success: false, message: "user not found" });
      if (USER_DETAILS.status === "blocked")
        return res.json({ success: false, message: "user Blocked" });

      const TOKENS = jwtTokenGenerationService.generateJwtTokens(USER_DETAILS);
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

    // Decodes token
    if (req.headers.hasOwnProperty("authorization")) {
      if (req.headers.authorization != "null") {
        // const TOKEN = req.headers.authorization
        // const DECODED_TOKEN = tokenManagement.decodeJwtToken(TOKEN)
        // if (DECODED_TOKEN != false) {
        //     isLoggedIn = true
        //     // userId = DECODED_TOKEN.id
        //     userEmail =  DECODED_TOKEN.email

        // }
        const USER_EMAIL = jwtTokenManagement.getUserEmailFromToken(
          req.headers.authorization
        );
        if (USER_EMAIL == false) {
          res.status(403).json({
            success: false,
          });
          return;
        }
        // Take userId from database
        userId = await userDetailsManagement.getDocumentId(USER_EMAIL);
        if (userId == false) {
          res.status(403).json({
            success: false,
          });
          return;
        }
        isLoggedIn = true;
      }
    } else {
      // if no token or invalid set as public user
      res.json({
        role: "public",
        loggedIn: false,
      });
      return;
    }

    // if user, gets userRole form id
    const USER_INFO = await getUserProfileData(userId);
    if (!USER_INFO) {
      res.status(403).json({
        success: false,
        message: "something went wrong",
      });
    }
    // if token valid set userloggin true\
    if (userId != null || USER_INFO != null) {
      res.json({
        userId: USER_INFO.id,
        role: USER_INFO.role,
        name: USER_INFO.name,
        image: USER_INFO.profilePictureUrl,
        loggedIn: isLoggedIn,
      });
    } else {
      res.json({
        role: "public",
        loggedIn: false,
      });
    }
  },
};
