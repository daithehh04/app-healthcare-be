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
    await queryInterface.addColumn("book_appointments", "results", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("book_appointments", "is_using_medicine", {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn(
      "book_appointments",
      "start_using_medicine",
      {
        type: Sequelize.DATE,
      }
    );
    await queryInterface.addColumn(
      "book_appointments",
      "distance_using_medicine",
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("book_appointments", "results");
    await queryInterface.removeColumn(
      "book_appointments",
      "start_using_medicine"
    );
    await queryInterface.removeColumn("book_appointments", "is_using_medicine");
    await queryInterface.removeColumn(
      "book_appointments",
      "distance_using_medicine"
    );
  },
};
