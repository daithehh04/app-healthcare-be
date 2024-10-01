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
