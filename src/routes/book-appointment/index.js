"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const BookAppointmentController = require("../../controllers/book-appointment.controller");
const router = express.Router()

router.get("/book-appointments", asyncHandler(BookAppointmentController.getAllBookAppointment))
router.post("/book-appointments", asyncHandler(BookAppointmentController.createBookAppointment))
router.patch("/book-appointments/:id", asyncHandler(BookAppointmentController.updatedBookAppointment))
router.delete("/book-appointments/:id", asyncHandler(BookAppointmentController.deleteBookAppointment))
module.exports = router