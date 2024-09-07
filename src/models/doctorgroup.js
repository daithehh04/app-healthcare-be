'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorGroup.hasMany(models.Doctor, { foreignKey: 'doctor_group_id', as: 'doctors' });
    }
  }
  DoctorGroup.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {

    sequelize,
    tableName: "doctor_groups",
    createdAt: "created_at",
    updatedAt: "updated_at",
    modelName: 'DoctorGroup',
  });
  return DoctorGroup;
};