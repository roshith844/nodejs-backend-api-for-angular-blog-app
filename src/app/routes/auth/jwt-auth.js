const express = require("express");
const { tryCatch } = require("../../utils/try-catch");
const router = express.Router();
const jwtAuthController = require("./../../controllers/refreshController");

router.post("/refresh-token", tryCatch(jwtAuthController.refreshToken));

module.exports = router;
