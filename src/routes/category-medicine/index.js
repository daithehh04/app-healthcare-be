"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const {
  getAllCategoryMedicine,
  createCategoryMedicine,
} = require("../../controllers/category-medicine.controller");
const router = express.Router();

router.get("/category-medicine", asyncHandler(getAllCategoryMedicine));
router.post("/category-medicine", asyncHandler(createCategoryMedicine));

module.exports = router;
