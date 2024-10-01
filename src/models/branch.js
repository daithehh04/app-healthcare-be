"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.hasMany(models.Doctor, { foreignKey: "branch_id", as: "doctors" });
      Branch.hasMany(models.BookAppointment, {
        foreignKey: "branch_id",
        as: "bookAppointments",
      });
    }
  }
  Branch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false, // Required field
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false, // Required field
      },
      geom: {
        type: DataTypes.GEOGRAPHY("POINT", 4326), // Use EPSG:4326
        allowNull: false, // Required field
      },
    },
    {
      sequelize,
      tableName: "branches",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Branch",
    }
  );
  return Branch;
};
