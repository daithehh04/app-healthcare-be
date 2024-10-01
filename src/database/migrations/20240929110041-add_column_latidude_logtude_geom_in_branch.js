"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("branches", "latitude", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    await queryInterface.addColumn("branches", "longitude", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });
    await queryInterface.addColumn("branches", "geom", {
      type: Sequelize.GEOGRAPHY("POINT", 4326), // Sử dụng hệ tọa độ EPSG:4326
      allowNull: false, // Required field
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("branches", "latitude");
    await queryInterface.removeColumn("branches", "longitude");
    await queryInterface.removeColumn("branches", "geom");
  },
};
