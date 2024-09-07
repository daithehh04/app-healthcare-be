const { CategoryMedicine } = require("../models/index");
class CategoryMedicineService {
  static getAllCategoryMedicine = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: categoryMedicine, count } =
      await CategoryMedicine.findAndCountAll(options);
    return {
      categoryMedicine,
      count,
    };
  };

  static createCategoryMedicine = async (payload) => {
    const { name } = payload;
    const category = await CategoryMedicine.create(payload);
    if (!category) throw new BadRequestError("Create Category error");
    return category;
  };
}

module.exports = CategoryMedicineService;
