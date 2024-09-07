const { SuccessResponse, CREATED } = require("../core/success.response.js");
const DoctorService = require("../services/doctor.service.js");
class DoctorController {
  static getAllDoctors = async (req, res) => {
    new SuccessResponse({
      message: "Get all Doctors Success!",
      data: await DoctorService.getAllDoctors(req.query),
    }).send(res)
  }

  static getDoctorDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get Doctor detail Success!",
      data: await DoctorService.getDoctorDetail(req.params),
    }).send(res)
  }

  static createDoctor = async (req, res) => {
    new CREATED({
      message: "Create Doctor OK!",
      data: await DoctorService.createDoctor(req.body),
    }).send(res)
  }
  static updatedDoctor = async (req, res) => {
    new CREATED({
      message: "updated Doctor OK!",
      data: await DoctorService.updatedDoctor(req.params, req.body),
    }).send(res)
  }
  static deleteDoctor = async (req, res) => {
    new CREATED({
      message: "delete Doctor OK!",
      data: await DoctorService.deleteDoctor(req.params),
    }).send(res)
  }
}

module.exports = DoctorController