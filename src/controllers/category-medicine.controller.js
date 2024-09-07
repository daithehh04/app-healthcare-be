const { SuccessResponse, CREATED } = require("../core/success.response.js");
const CategoryMedicineService = require("../services/category-medicine.service.js");
class CategoryMedicineController {
  static getAllCategoryMedicine = async (req, res) => {
    new SuccessResponse({
      message: "Get all category medicine Success!",
      data: await CategoryMedicineService.getAllCategoryMedicine(req.query),
    }).send(res);
  };

  static createCategoryMedicine = async (req, res) => {
    new CREATED({
      message: "Create Category medicine OK!",
      data: await CategoryMedicineService.createCategoryMedicine(req.body),
    }).send(res);
  };
}

module.exports = CategoryMedicineController;
