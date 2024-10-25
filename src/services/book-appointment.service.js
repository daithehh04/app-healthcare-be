const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const {
  BookAppointment,
  Doctor,
  User,
  Branch,
  DoctorGroup,
} = require("../models/index");
class BookAppointmentService {
  static getAllBookAppointment = async ({
    page,
    limit,
    userId,
    keyword,
    status,
  }) => {
    const options = {
      include: [
        {
          model: Branch,
        },
        {
          model: Doctor,
          include: [
            {
              model: DoctorGroup,
              as: "doctor_group",
            },
          ],
        },
        {
          model: User,
        },
      ],
      order: [["updated_at", "desc"]],
    };
    // if (userId) {
    //   options.where = {
    //     user_id: userId,
    //   };
    // }
    options.where = {};
    if (userId || status) {
      options.where = {
        ...(userId && { user_id: userId }), // Spread operator adds condition only if userId exists
        ...(status && { status }), // Spread operator adds condition only if status exists
      };
    }

    if (keyword) {
      options.include.forEach((includeOption) => {
        if (includeOption.model === User && keyword) {
          includeOption.where = {
            name: {
              [Op.iLike]: `%${keyword}%`,
            },
          };
        }
      });
    }
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }
    const { rows: appointmentsResult, count } =
      await BookAppointment.findAndCountAll(options);
    const appointments = appointmentsResult.map((appointment) => ({
      doctor: {
        id: appointment.Doctor?.id,
        name: appointment.Doctor?.name,
        image: appointment.Doctor?.image,
        address: appointment.Doctor?.address,
        phone: appointment.Doctor?.phone,
        exp: appointment.Doctor?.exp,
        price: appointment.Doctor?.price,
        group: appointment.Doctor?.doctor_group?.name,
      },
      user: {
        id: appointment.User.id,
        name: appointment.User.name,
        email: appointment.User.email,
      },
      branch: {
        id: appointment.Branch.id,
        address: appointment.Branch.address,
      },
      id: appointment.id,
      startTime: appointment.start_time,
      endTime: appointment.end_time,
      status: appointment.status,
      results: appointment.results,
      is_using_medicine: appointment.is_using_medicine,
      distance_using_medicine: appointment.distance_using_medicine,
      start_using_medicine: appointment.start_using_medicine,
      voucher_code: appointment.voucher_code,
    }));
    return {
      appointments,
      count,
    };
  };
}

module.exports = BookAppointmentService;
