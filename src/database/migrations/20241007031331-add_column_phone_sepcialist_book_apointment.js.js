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
    await queryInterface.addColumn("book_appointments", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("book_appointments", "specialist_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "doctor_groups",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("book_appointments", "phone");
    await queryInterface.removeColumn("book_appointments", "specialist_id");
  },
};
