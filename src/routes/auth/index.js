"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const AuthController = require("../../controllers/auth.controller")
const router = express.Router()

router.post("/signup", asyncHandler(AuthController.signup))
router.post("/login", asyncHandler(AuthController.login))
router.post("/logout", asyncHandler(AuthController.logout))

module.exports = router
