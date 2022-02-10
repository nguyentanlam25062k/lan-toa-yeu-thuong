'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Rating_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User_Rating_Product.init({
    star: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    adminReply: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User_Rating_Product',
    freezeTableName: true
  });
  return User_Rating_Product;
};