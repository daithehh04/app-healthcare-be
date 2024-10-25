const { SuccessResponse, CREATED } = require("../core/success.response.js");
const BookAppointmentService = require("../services/book-appointment.service.js");
const { BookAppointment, Doctor, User, Voucher } = require("../models/index");
const isValidStatus = require("../utils/validStatus.js");
const { Op } = require("sequelize");
const sendMail = require("../utils/mail.js");
const moment = require("moment");
class BookAppointmentController {
  static getAllBookAppointment = async (req, res) => {
    console.log(req.query);
    new SuccessResponse({
      message: "Get all BookAppointment Success!",
      data: await BookAppointmentService.getAllBookAppointment(req.query),
    }).send(res);
  };
  static createBookAppointment = async (req, res) => {
    const {
      doctorId,
      userId,
      email,
      startTime,
      endTime,
      branch_id,
      phone,
      specialist_id,
      voucher_code,
    } = req.body;
    let branchId;
    let specialistId;
    const response = {};
    try {
      if (!doctorId) {
        await BookAppointment.create({
          doctor_id: null,
          user_id: userId,
          start_time: startTime,
          end_time: endTime,
          status: "pending",
          branch_id: branch_id,
          phone: phone,
          specialist_id: specialist_id,
          voucher_code: voucher_code,
        });
        if (voucher_code) {
          const existingVoucher = await Voucher.findOne({
            where: {
              voucher_code,
            },
          });
          await existingVoucher.update({
            is_used: true,
          });
        }
        response.status = 201;
        response.message = "thêm thành công";
      } else {
        const doctorFind = await Doctor.findByPk(doctorId);
        const userFind = await User.findByPk(userId);
        if (!doctorFind) {
          return res
            .status(404)
            .json({ status: 404, message: "Bác sĩ  không tồn tại!" });
        }
        if (!userFind) {
          return res
            .status(404)
            .json({ status: 404, message: "Tài khoản không tồn tại!" });
        }
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (start < new Date()) {
          return res.status(400).json({
            status: 400,
            message:
              "Thời gian bắt đầu phải lớn hơn hoặc bằng thời gian hiện tại!",
          });
        }
        if (start >= end) {
          return res.status(400).json({
            status: 400,
            message: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!",
          });
        }
        if ((end.getTime() - start.getTime()) / 3600000 < 1) {
          return res.status(400).json({
            status: 400,
            message:
              "Thời gian hẹn lịch tối thiệu là 1 hoặc tối thiểu là 1 giờ",
          });
        }
        if ((end.getTime() - start.getTime()) / 3600000 > 4) {
          return res.status(400).json({
            status: 400,
            message:
              "Thời gian hẹn lịch tối đa là 3 giờ hoặc tối thiểu là 1 giờ",
          });
        }
        const existingAppointments = await BookAppointment.findOne({
          where: {
            doctor_id: doctorId,
            status: {
              [Op.or]: ["pending"],
            },
            [Op.or]: [
              {
                start_time: {
                  [Op.between]: [start, end],
                },
              },
              {
                end_time: {
                  [Op.between]: [start, end],
                },
              },
              {
                [Op.and]: [
                  {
                    start_time: {
                      [Op.lte]: start,
                    },
                  },
                  {
                    end_time: {
                      [Op.gte]: end,
                    },
                  },
                ],
              },
            ],
          },
        });
        if (existingAppointments) {
          return res.status(409).json({
            status: 409,
            message: "Bác sĩ đã có lịch hẹn trong khoảng thời gian này!",
          });
        }
        if (!branch_id) {
          branchId = doctorFind.branch_id;
          console.log("branchId : ", branchId);
        }
        if (!specialist_id) {
          specialistId = doctorFind.doctor_group_id;
          console.log("specialistId : ", specialistId);
        }
        await BookAppointment.create({
          doctor_id: doctorId,
          user_id: userId,
          start_time: startTime,
          end_time: endTime,
          phone: null,
          status: "pending",
          branch_id: branchId,
          specialist_id: specialistId,
          voucher_code: voucher_code || null,
        });
        // update voucher to used
        if (voucher_code) {
          const existingVoucher = await Voucher.findOne({
            where: {
              voucher_code,
            },
          });
          await existingVoucher.update({
            is_used: true,
          });
        }
        //
        response.status = 201;
        response.message = "cập nhật thành công";
      }
      // await userFind.addDoctor(doctorFind,
      //      {
      //           through:
      //           {
      //                start_time: startTime,
      //                end_time: endTime,
      //                status: 'pending',
      //           }
      //      });
      // const branch_id = doctorFind.branch_id;
      // console.log(branch_id);
      // await BookAppointment.create({
      //   doctor_id: doctorId,
      //   user_id: userId,
      //   start_time: startTime,
      //   end_time: endTime,
      //   status: "pending",
      //   branch_id: branch_id,
      // });
      // response.status = 201;
      // response.message = "cập nhật thành công";
    } catch (e) {
      response.status = 500;
      response.message = e?.message;
    }
    if (response.status === 201) {
      await sendMail(email, "Thank you", "Đặt lịch thành công!", {
        start_time: moment(startTime).format("h:mm:ss a"),
        end_time: moment(endTime).format("h:mm:ss a"),
        date: moment(startTime).format("DD-MM-YYYY"),
      });
    }
    return res.status(response.status).send(response);
  };
  static updatedBookAppointment = async (req, res) => {
    const { id } = req.params;
    const dataBody = req.body;
    const response = {};
    try {
      const bookAppointment = await BookAppointment.findByPk(id);
      if (!bookAppointment) {
        return res
          .status(404)
          .json({ status: 404, message: "Lich hẹn không tồn tại!" });
      }
      if (!dataBody.status || !isValidStatus(dataBody.status)) {
        return res.status(400).json({
          status: 404,
          message: "Trạng thái Đặt lịch không xác định!",
        });
      }
      bookAppointment.status = dataBody.status;
      bookAppointment.distance_using_medicine =
        dataBody.distance_using_medicine;
      bookAppointment.is_using_medicine = dataBody.is_using_medicine;
      bookAppointment.start_using_medicine = dataBody.start_using_medicine;
      bookAppointment.results = dataBody.results;
      bookAppointment.save();
      response.status = 200;
      response.message = "Đặt lịch thành công";
    } catch (e) {
      response.status = 500;
      response.message = e?.message;
    }
    return res.status(response.status).send(response);
  };
  static deleteBookAppointment = async (req, res) => {
    const { id } = req.params;
    const response = {};
    try {
      const bookAppointment = await BookAppointment.findByPk(id);
      if (!bookAppointment) {
        return res
          .status(404)
          .json({ status: 404, message: "Lich hẹn không tồn tại!" });
      }
      await BookAppointment.destroy({
        where: {
          id,
        },
      });
      response.status = 200;
      response.message = "xóa thành công";
    } catch (e) {
      response.status = 500;
      response.message = e?.message;
    }
    return res.status(response.status).send(response);
  };
}

module.exports = BookAppointmentController;
