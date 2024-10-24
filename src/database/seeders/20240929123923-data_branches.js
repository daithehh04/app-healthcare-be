"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const branches = [
      {
        address: "Chi nhánh 1, Hà Nội",
        latitude: 21.0285,
        longitude: 105.8542,
      },
      {
        address: "Chi nhánh 2, Thành phố Hồ Chí Minh",
        latitude: 10.7769,
        longitude: 106.6951,
      },
      {
        address: "Hoàn Kiếm, Hà Nội",
        latitude: 21.0285,
        longitude: 105.8481,
      },
      {
        address: "Ninh Bình",
        latitude: 20.2539,
        longitude: 105.9745,
      },
      {
        address: "Thái Bình",
        latitude: 20.4464,
        longitude: 106.3361,
      },
      {
        address: "Hải Phòng",
        latitude: 20.8449,
        longitude: 106.6881,
      },
      {
        address: "Đà Nẵng",
        latitude: 16.0471,
        longitude: 108.2068,
      },
      {
        address: "Cần Thơ",
        latitude: 10.0452,
        longitude: 105.7469,
      },
      {
        address: "Vũng Tàu",
        latitude: 10.345,
        longitude: 107.0843,
      },
      {
        address: "Bắc Ninh",
        latitude: 21.186,
        longitude: 106.0763,
      },
      {
        address: "Huế",
        latitude: 16.4637,
        longitude: 107.5909,
      },
      {
        address: "Quảng Ninh",
        latitude: 20.9711,
        longitude: 107.0439,
      },
      {
        address: "Hòa Bình",
        latitude: 20.8589,
        longitude: 105.337,
      },
      {
        address: "Lào Cai",
        latitude: 22.4856,
        longitude: 103.9707,
      },
      {
        address: "Thanh Hóa",
        latitude: 19.8067,
        longitude: 105.7763,
      },
      {
        address: "Nghệ An",
        latitude: 19.3937,
        longitude: 104.8918,
      },
      {
        address: "Kiên Giang",
        latitude: 10.012,
        longitude: 105.0809,
      },
    ];

    const branchesToInsert = branches.map((branch) => ({
      address: branch.address,
      latitude: branch.latitude,
      longitude: branch.longitude,
      geom: `POINT(${branch.longitude} ${branch.latitude})`, // Tạo geom từ kinh độ và vĩ độ
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("branches", branchesToInsert);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("branches", null, {});
  },
};
