const { SuccessResponse, CREATED } = require("../core/success.response.js");
const DoctorGroupService = require("../services/doctor-group.service.js");
class DoctorGroupController {
  static getAllDoctorGroups = async (req, res) => {
    new SuccessResponse({
      message: "Get all DoctorGroups Success!",
      data: await DoctorGroupService.getAllDoctorGroups(req.query),
    }).send(res);
  };

  static getDoctorGroupDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get DoctorGroup detail Success!",
      data: await DoctorGroupService.getDoctorGroupDetail(req.params),
    }).send(res);
  };

  static createDoctorGroup = async (req, res) => {
    new CREATED({
      message: "Create DoctorGroup OK!",
      data: await DoctorGroupService.createDoctorGroup(req.body),
    }).send(res);
  };

  static updateDoctorGroup = async (req, res) => {
    new SuccessResponse({
      message: "Update doctor group Success!",
      data: await DoctorGroupService.updateDoctorGroup(req.params, req.body),
    }).send(res);
  };

  static deleteDoctorGroup = async (req, res) => {
    new SuccessResponse({
      message: "Delete doctor group Success!",
      data: await DoctorGroupService.deleteDoctorGroup(req.params),
    }).send(res);
  };
}

module.exports = DoctorGroupController;
