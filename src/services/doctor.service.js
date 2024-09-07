const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response")
const { Doctor, DoctorGroup } = require("../models/index");
class DoctorService {
  static getAllDoctors = async ({ page, limit, keyword, doctorGroupId }) => {
    const options = {
      order: [["created_at", "desc"]],

    }
    if (doctorGroupId) {
      options.where = {
        doctor_group_id: doctorGroupId,
      }
    }
    if (keyword) {
      options.where =
        { name: { [Op.iLike]: `%${keyword}%` } }


    }
    if (!+page || page < 0) {
      page = 1
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit
      const offset = (page - 1) * limit
      options.offset = offset
    }

    const { rows: doctors, count } = await Doctor.findAndCountAll(options)
    return {
      doctors,
      count,
    }
  }
  static getDoctorDetail = async ({ id }) => {
    const doctor = await Doctor.findByPk(id)
    if (!doctor) {
      throw new NotFoundError("Doctor không tồn tại!")
    }
    return doctor
  }
  static createDoctor = async (payload) => {
    const doctorGroup = await DoctorGroup.findByPk(payload.doctor_group_id);
    if (!doctorGroup) {
      throw new NotFoundError("DoctorGroup không tồn tại!")
    }
    const doctor = await Doctor.create(payload)
    if (!doctor) throw new BadRequestError("Create Doctor error")
    return doctor
  }
  static updatedDoctor = async ({ id }, payload) => {
    const doctorGroup = await DoctorGroup.findByPk(payload.doctor_group_id);
    const doctorFind = await Doctor.findByPk(id);
    if (!doctorFind) {
      throw new NotFoundError("Doctor không tồn tại!")
    }
    if (!doctorGroup) {
      throw new NotFoundError("DoctorGroup không tồn tại!")
    }
    await Doctor.update(payload, {
      where: {
        id,
      },
    })

  }
  static deleteDoctor = async ({ id }) => {
    const doctorFind = await Doctor.findByPk(id);
    if (!doctorFind) {
      throw new NotFoundError("Doctor không tồn tại!")
    }
    await Doctor.destroy({
      where: {
        id
      },
    })

  }

}

module.exports = DoctorService