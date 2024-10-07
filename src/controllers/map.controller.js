const MapService = require("../services/map.service");
const { Branch } = require("../models/index");
const { Sequelize } = require("sequelize");
module.exports = {
  getNearPlaces: async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "latitude and longitude are required" });
    }

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
        // limit: 2, // Giới hạn trả về 10 địa điểm gần nhất
      });

      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
