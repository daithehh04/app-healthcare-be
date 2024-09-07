"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: 'user_id', as: 'carts' });
      User.belongsToMany(models.Doctor, { through: models.BookAppointment, foreignKey: 'user_id', otherKey: 'doctor_id' });
      User.hasMany(models.BookAppointment, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING(100),
      password: DataTypes.STRING(150),
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return User
}
