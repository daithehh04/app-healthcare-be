'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.DoctorGroup, {
        foreignKey: "doctor_group_id",
        as: "doctor_group",
      });
      Doctor.belongsToMany(models.User, { through: models.BookAppointment, foreignKey: 'doctor_id', otherKey: 'user_id' });
      Doctor.hasMany(models.BookAppointment, { foreignKey: 'doctor_id' });
    }
  }
  Doctor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_group_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    exp: DataTypes.FLOAT,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    tableName: "doctors",
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: 'Doctor',
  });
  return Doctor;
};