const formValidation = require('../../use-cases/validation/form-validation')
const formDataVerificationService = require('./../../use-cases/verification/formData-verification')
const jwtTokenGenerationService = require('./../../use-cases/token/jwt-tokens-generation')

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
                "status": false,
                "message": "invalid Credentials"
            })
        }
    }
}