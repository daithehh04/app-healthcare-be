"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const VoucherController = require("../../controllers/voucher.controller");
const router = express.Router();

router.get("/voucher", asyncHandler(VoucherController.getAllVouchers));
router.get("/voucher/:id", asyncHandler(VoucherController.getVoucherDetail));
router.post(
  "/getVoucherByCode",
  asyncHandler(VoucherController.getVoucherByCode)
);
router.post("/voucher/:id", asyncHandler(VoucherController.createVoucher));
router.delete("/voucher/:id", asyncHandler(VoucherController.deleteVoucher));

module.exports = router;
