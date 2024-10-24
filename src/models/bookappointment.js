"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookAppointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookAppointment.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
      BookAppointment.belongsTo(models.User, { foreignKey: "user_id" });
      BookAppointment.belongsTo(models.Branch, { foreignKey: "branch_id" });
    }
  }
  BookAppointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      branch_id: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      specialist_id: DataTypes.INTEGER,
      results: DataTypes.TEXT,
      is_using_medicine: DataTypes.BOOLEAN,
      distance_using_medicine: DataTypes.INTEGER,
      start_using_medicine: DataTypes.DATE,
      voucher_code: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "book_appointments",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "BookAppointment",
    }
  );
  return BookAppointment;
};
