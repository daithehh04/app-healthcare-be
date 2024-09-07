"use strict"

const express = require("express")
const router = express.Router()

router.use("/v1/api/auth", require("./auth"))
router.use("/v1/api", require("./medicine"))
router.use("/v1/api", require("./user"));
router.use("/v1/api", require("./article"))
router.use("/v1/api", require("./order"))
router.use("/v1/api", require("./doctor"))
router.use("/v1/api", require("./doctor-group"))
router.use("/v1/api", require("./upload"))
router.use("/v1/api", require("./book-appointment"))

module.exports = router
