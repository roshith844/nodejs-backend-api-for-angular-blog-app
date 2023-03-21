const cloudinary = require("../../config/cloudinary")
const { getUserDetails, getAdminDetails } = require("../../use-cases/get-data-from-database/get-user-details")
const { editProfilebyId } = require("../../use-cases/save-to-database/update-user-data")
const { saveUserProfilePictureUrl } = require("../../use-cases/upload-profile-picture/save-image-url")

module.exports = {
    getProfile: async (req, res) => {
        const ADMIN_ID = req.admin
        const ADMIN_DETAILS = await getAdminDetails(ADMIN_ID)
        if (ADMIN_DETAILS === false || ADMIN_DETAILS === null || ADMIN_DETAILS.length === 0) {
            res.json({
                "success": false
            })
            res.end()
            return
        } else {
            res.json({
                "success": true,
                "name": ADMIN_DETAILS.name,
                "email": ADMIN_DETAILS.email,
                "phone": ADMIN_DETAILS.phone,
                "image": ADMIN_DETAILS.profie_picture_url,
                "role": ADMIN_DETAILS.role
            })
        }
    },
    editProfile: async (req, res) => {
        const ADMIN_ID = req.admin
        const { name, email, phone } = req.body
        if (await editProfilebyId(ADMIN_ID, name, email, phone) === true) {
            res.json({ "success": true })
        } else {
            res.json({ "success": false })
        }
    },
    editProfileImage: async (req, res) => {

        // Uploads to cloudinary
        const RESULT = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${req.user}_profile`,
            width: 500,
            height: 500,
            crop: 'fill'
        })

        const ADMIN_ID = req.admin
        if (!RESULT) return res.json(res.json({ "success": false, "message": "not uploaded to cloudinary" }))

        const IMAGE_URL = RESULT.url

        if (await saveUserProfilePictureUrl(ADMIN_ID, IMAGE_URL) === true) {
            res.json({ "success": true, "data": IMAGE_URL })
        } else {
            res.json({ "success": false })
        }
    }
}