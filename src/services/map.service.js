const { Branch } = require("../models/index");
const { Sequelize } = require("sequelize");
module.exports = {
  getMap: async (latitude, longitude) => {
    try {
      // Truy vấn tìm các địa điểm gần nhất sử dụng ST_Distance
      const places = await Branch.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn(
                "ST_Distance",
                Sequelize.col("geom"),
                Sequelize.fn(
                  "ST_SetSRID",
                  Sequelize.fn("ST_MakePoint", longitude, latitude),
                  4326
                )
              ),
              "distance",
            ],
          ],
        },
        order: [[Sequelize.literal("distance"), "ASC"]], // Sắp xếp theo khoảng cách
        limit: 10, // Giới hạn trả về 10 địa điểm gần nhất
      });

      return places;
    } catch (error) {
      throw error;
    }
  },
};
