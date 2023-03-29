const { verifyAdmin } = require("../../use-cases/admin/formdataVerification")
const { getDocumentId } = require("../../use-cases/get-data-from-database/get-user-details")
const { generateJwtTokens } = require("../../use-cases/token/jwt-token-management")
const { validateEmail, validatePassword } = require("../../use-cases/validation/form-validation")

module.exports = {
    loginAdmin: async (req, res, next) => {
        const { email, password } = req.body
        if (!(validateEmail(email) || validatePassword(password))) {
            return res.status(400).json({
                message: "validation failed"
            })
        }

        const VERIFICATION_SUCCESS = await verifyAdmin(email, password)
        if (!VERIFICATION_SUCCESS) return res.json({ "success": false, "message": "Verification Failed" })

        const USER_ID = await getDocumentId(email)

        const ADMIN_DETAILS = { "id": USER_ID, "email": email }

        const TOKENS = generateJwtTokens( ADMIN_DETAILS)
        res.json(TOKENS)
    }
}