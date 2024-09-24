"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../../controllers/branch.controller");
const router = express.Router();

router.get("/branches", asyncHandler(getAllBranches));
router.patch("/branch/:id", asyncHandler(updateBranch));
router.delete("/branch/:id", asyncHandler(deleteBranch));
router.post("/branch", asyncHandler(createBranch));

module.exports = router;
