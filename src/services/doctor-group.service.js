const { DoctorGroup } = require("../models/index");
const { NotFoundError, BadRequestError } = require("../core/error.response")
class DoctorGroupService {
     static getAllDoctorGroups = async ({ page, limit }) => {
          const options = {
               order: [["created_at", "desc"]],
          }
          if (!+page || page < 0) {
               page = 1
          }

          if (limit && Number.isInteger(+limit)) {
               options.limit = limit
               const offset = (page - 1) * limit
               options.offset = offset
          }

          const { rows: doctorGroups, count } = await DoctorGroup.findAndCountAll(options)
          return {
               doctorGroups,
               count,
          }
     }
     static getDoctorGroupDetail = async ({ id }) => {
          const doctorGroup = await DoctorGroup.findByPk(id)
          if (!doctorGroup) {
               throw new NotFoundError("DoctorGroup không tồn tại!")
          }
          return doctorGroup
     }
     static createDoctorGroup = async (payload) => {
          const {
               name, image
          } = payload;
          const doctorGroup = await DoctorGroup.create(payload)
          if (!doctorGroup) throw new BadRequestError("Create DoctorGroup error")
          return doctorGroup
     }
}

module.exports = DoctorGroupService