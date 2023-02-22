const formValidation = require('../../use-cases/validation/form-validation')
const formDataVerificationService = require('./../../use-cases/verification/formData-verification')
const jwtTokenGenerationService = require('./../../use-cases/token/jwt-tokens-generation')
const hashingService = require('./../../use-cases/hashing/password-hashing')
const saveToDatabaseService = require('./../../use-cases/save-to-database/save-user-data')
module.exports = {
    loginUser: async (req, res) => {
        const { email, password } = req.body

        if (!(formValidation.validateEmail(email) || formValidation.validatePassword(password))) {
            res.status(400).json({
                message: "validation failed"
            })
        }

        const VERIFICATION_SUCCESS = await formDataVerificationService.verifyUser(email, password)
        if (VERIFICATION_SUCCESS) {
            const USER_DETAILS = { "email": email }
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
        const { name, email, password, confirmPassword } = req.body
        if ((await formValidation.checkUserExistance(email) == true)) {
            res.json({
                "success": false
            })
        } else if (password === confirmPassword && (formValidation.vallidateName(name) && formValidation.validateEmail(email) && formValidation.validatePassword(password))) {
            const HASHED_PASSWORD = await hashingService.hashPassword(password)
            await saveToDatabaseService.saveSignupFormData({ name: name, email: email, password: HASHED_PASSWORD })
            res.json({
                "success": true
            })
        }

    }
}