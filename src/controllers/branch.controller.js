const { SuccessResponse } = require("../core/success.response");
const BranchService = require("../services/branch.service");

class BranchController {
  static getAllBranches = async (req, res) => {
    new SuccessResponse({
      message: "Get all branches!",
      data: await BranchService.getAllBranches(req.query),
    }).send(res);
  };
  static createBranch = async (req, res) => {
    new CREATED({
      message: "Create branch OK!",
      data: await BranchService.createBranch(req.body),
    }).send(res);
  };

  static updateBranch = async (req, res) => {
    new SuccessResponse({
      message: "Update branch Success!",
      data: await BranchService.updateBranch(req.params, req.body),
    }).send(res);
  };

  static deleteCategoryMedicine = async (req, res) => {
    new SuccessResponse({
      message: "Delete category medicine Success!",
      data: await BranchService.deleteBranch(req.params),
    }).send(res);
  };
}

module.exports = BranchController;
