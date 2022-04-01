'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Cart, {foreignKey: 'userId'});

    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    wardId: DataTypes.INTEGER,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};