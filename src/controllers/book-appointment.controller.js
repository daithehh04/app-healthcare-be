const { SuccessResponse, CREATED } = require("../core/success.response.js");
const BookAppointmentService = require("../services/book-appointment.service.js");
const { BookAppointment, Doctor, User } = require("../models/index");
const isValidStatus = require("../utils/validStatus.js")
const { Op } = require("sequelize");
class BookAppointmentController {
     static getAllBookAppointment = async (req, res) => {
          new SuccessResponse({
               message: "Get all BookAppointment Success!",
               data: await BookAppointmentService.getAllBookAppointment(req.query),
          }).send(res)
     }
     static createBookAppointment = async (req, res) => {
          const { doctorId, userId, startTime, endTime } = req.body;
          const response = {};
          try {
               const doctorFind = await Doctor.findByPk(doctorId);
               const userFind = await User.findByPk(userId);
               if (!doctorFind) {
                    return res.status(404).json({ status: 404, message: "Bác sĩ  không tồn tại!" });
               }
               if (!userFind) {
                    return res.status(404).json({ status: 404, message: "Tài khoản không tồn tại!" });
               }
               const start = new Date(startTime);
               const end = new Date(endTime);
               if (start < new Date()) {
                    return res.status(400).json({ status: 400, message: "Thời gian bắt đầu phải lớn hơn hoặc bằng thời gian hiện tại!" });
               }
               if (start >= end) {
                    return res.status(400).json({ status: 400, message: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc!" });
               }
               if ((end.getTime() - start.getTime()) / 3600000 < 1) {
                    return res.status(400).json({ status: 400, message: "Thời gian hẹn lịch tối thiệu là 1 hoặc tối thiểu là 1 giờ" });
               }
               if ((end.getTime() - start.getTime()) / 3600000 > 4) {
                    return res.status(400).json({ status: 400, message: "Thời gian hẹn lịch tối đa là 3 giờ hoặc tối thiểu là 1 giờ" });
               }
               const existingAppointments = await BookAppointment.findOne({
                    where: {
                         doctor_id: doctorId,
                         status: {
                              [Op.or]: ["pending"]
                         }
                         ,
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
                    return res.status(409).json({ status: 409, message: "Bác sĩ đã có lịch hẹn trong khoảng thời gian này!" });
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
               await BookAppointment.create({
                    doctor_id: doctorId,
                    user_id: userId,
                    start_time: startTime,
                    end_time: endTime,
                    status: 'pending',
               })
               response.status = 201;
               response.message = "cập nhật thành công"

          } catch (e) {
               response.status = 500;
               response.message = e?.message;
          }
          return res.status(response.status).send(response);
     }
     static updatedBookAppointment = async (req, res) => {
          const { id } = req.params;
          const { status } = req.body;
          const response = {};
          try {
               const bookAppointment = await BookAppointment.findByPk(id);
               if (!bookAppointment) {
                    return res.status(404).json({ status: 404, message: "Lich hẹn không tồn tại!" });
               }
               if (!status || !isValidStatus(status)) {
                    return res.status(400).json({ status: 404, message: "Trạng thái Đặt lịch không xác định!" });
               }
               bookAppointment.status = status;
               bookAppointment.save();
               response.status = 200;
               response.message = "Đặt lịch thành công"

          } catch (e) {
               response.status = 500;
               response.message = e?.message;
          }
          return res.status(response.status).send(response);
     }
     static deleteBookAppointment = async (req, res) => {
          const { id } = req.params;
          const response = {};
          try {
               const bookAppointment = await BookAppointment.findByPk(id);
               if (!bookAppointment) {
                    return res.status(404).json({ status: 404, message: "Lich hẹn không tồn tại!" });
               }
               await BookAppointment.destroy({
                    where: {
                         id
                    },
               })
               response.status = 200;
               response.message = "xóa thành công"

          } catch (e) {
               response.status = 500;
               response.message = e?.message;
          }
          return res.status(response.status).send(response);
     }
}

module.exports = BookAppointmentController