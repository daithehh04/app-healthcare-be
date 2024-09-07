

const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { BookAppointment, Doctor, User } = require("../models/index");
class BookAppointmentService {
     static getAllBookAppointment = async ({ page, limit, userId, keyword }) => {
          const options = {
               include: [
                    {
                         model: Doctor
                    },
                    {
                         model: User
                    }
               ],
               order: [["updated_at", "desc"]],

          }
          if (userId) {
               options.where = {
                    user_id: userId
               }
          }
          if (keyword) {
               options.include.forEach(includeOption => {
                    console.log("includeOption.model === Doctor", includeOption.model === Doctor)
                    if (includeOption.model === Doctor && keyword) {
                         includeOption.where = {
                              name: {
                                   [Op.iLike]: `%${keyword}%`
                              }
                         };
                    }
               });
          }
          if (!+page || page < 0) {
               page = 1
          }

          if (limit && Number.isInteger(+limit)) {
               options.limit = limit
               const offset = (page - 1) * limit
               options.offset = offset
          }
          const { rows: appointmentsResult, count } = await BookAppointment.findAndCountAll(options);
          const appointments = appointmentsResult.map(appointment => ({
               doctor: {
                    id: appointment.Doctor.id,
                    name: appointment.Doctor.name,
                    image: appointment.Doctor.image,
                    address: appointment.Doctor.address,
                    phone: appointment.Doctor.phone,
                    exp: appointment.Doctor.exp,
                    price: appointment.Doctor.price,
               },
               user: {
                    id: appointment.User.id,
                    name: appointment.User.name,
                    email: appointment.User.email
               },
               id: appointment.id,
               startTime: appointment.start_time,
               endTime: appointment.end_time,
               status: appointment.status

          }));
          return {
               appointments,
               count,
          }
     }
}

module.exports = BookAppointmentService