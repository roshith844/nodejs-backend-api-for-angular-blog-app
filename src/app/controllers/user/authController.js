const formValidation = require('../../use-cases/validation/form-validation')
const formDataVerificationService = require('./../../use-cases/verification/formData-verification')
const jwtTokenGenerationService = require('../../use-cases/token/jwt-token-management')
const hashingService = require('./../../use-cases/hashing/password-hashing')
const saveToDatabaseService = require('./../../use-cases/save-to-database/save-user-data')
const { getDocumentId } = require('../../use-cases/get-data-from-database/get-user-details')
const { getUserRole, getUserDetails } = require("../../use-cases/get-data-from-database/get-user-details")
const tokenManagement = require("../../use-cases/token/jwt-token-management")
// decodeJwtToken
module.exports = {
    loginUser: async (req, res) => {
        const { email, password } = req.body
        if (!(formValidation.validateEmail(email) || formValidation.validatePassword(password))) {
            res.status(400).json({
                message: "validation failed"
            })
            return
        }

        const VERIFICATION_SUCCESS = await formDataVerificationService.verifyUser(email, password)
        const USER_ID = await getDocumentId(email)
        if (VERIFICATION_SUCCESS) {
            const USER_DETAILS = { "id": USER_ID, "email": email }
            const TOKENS = jwtTokenGenerationService.generateJwtTokens(USER_DETAILS)
            res.json(TOKENS)

        } else {
            console.log('verification failed')
            res.json({
                "success": false,
                "message": "invalid Credentials"
            })
        }
    },

    signupUser: async (req, res) => {

        const { name, email, phone, password, confirmPassword } = req.body
        if ((await formValidation.checkUserExistance(email) == true)) {
            res.json({
                "success": false
            })
        } else if (password === confirmPassword && (formValidation.vallidateName(name) && formValidation.validateEmail(email) && formValidation.validatePhoneNumber(phone) && formValidation.validatePassword(password))) {
            const HASHED_PASSWORD = await hashingService.hashPassword(password)
            await saveToDatabaseService.saveSignupFormData({ name: name, email: email, phone: phone, password: HASHED_PASSWORD })
            res.json({
                "success": true
            })
        }
    },
    getUserStatus: async (req, res) => {
        let isLoggedIn = false
        let userId
        let nameOfUser = 'unknown'

        // Decodes token 
        if (req.headers.hasOwnProperty('authorization')) {
            if (req.headers.authorization != 'null') {
                const TOKEN = req.headers.authorization
                const DECODED_TOKEN = tokenManagement.decodeJwtToken(TOKEN)
                console.log(DECODED_TOKEN)
                if (DECODED_TOKEN != false) {
                    isLoggedIn = true
                    userId = DECODED_TOKEN.id
                    
                }
            }

        } else {
            // if no token or invalid set as public user
            res.json({
                "role": 'public',
                "loggedIn": false

            })
            res.end()
            return
        }

        // if user, gets userRole form id
        const USER_INFO = await getUserRole(userId)
console.log("authController")
        console.log(USER_INFO)

        // if token valid set userloggin true
        if (userId != null || USER_INFO != null) {
            res.json({
                "role": USER_INFO.role,
                "name": USER_INFO.name,
                "loggedIn": isLoggedIn,
            })
        } else {
            res.json({
                "role": 'public',
                "loggedIn": false
            })
        }

    },

}