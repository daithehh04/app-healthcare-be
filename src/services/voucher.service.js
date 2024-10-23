const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Voucher } = require("../models/index");
class VoucherService {
  static getAllVouchers = async ({ page, limit, userId }) => {
    const options = {
      order: [["created_at", "desc"]],
      where: {
        is_used: false,
        user_id: +userId,
      },
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: vouchers, count } = await Voucher.findAndCountAll(options);
    return {
      vouchers,
      count,
    };
  };

  static deleteVoucher = async ({ id }) => {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) {
      throw new NotFoundError("Voucher not found!");
    }
    const deleted = await Voucher.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
  static updateVoucher = async ({ id }, payload) => {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) {
      throw new NotFoundError("Voucher not found!");
    }
    await Voucher.update(payload, {
      where: {
        id,
      },
    });
  };
  static getVoucherDetail = async ({ id }) => {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) {
      throw new NotFoundError("Voucher không tồn tại!");
    }
    return voucher;
  };
  static createVoucher = async (payload) => {
    const voucher = await Voucher.create(payload);
    if (!voucher) throw new BadRequestError("Create voucher error");
    return voucher;
  };
}

module.exports = VoucherService;
