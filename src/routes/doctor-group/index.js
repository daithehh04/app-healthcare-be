"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const DoctorGroupController = require("../../controllers/doctor-group.controller")
const router = express.Router()

router.get("/doctor-group", asyncHandler(DoctorGroupController.getAllDoctorGroups))
router.get("/doctor-group/:id", asyncHandler(DoctorGroupController.getDoctorGroupDetail))
router.post("/doctor-group", asyncHandler(DoctorGroupController.createDoctorGroup))

module.exports = router