'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product_Extra_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Product_Extra_Info.init({
    weight: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    ingredient: DataTypes.STRING,
    expiry: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Extra_Info',
    freezeTableName: true
  });
  return Product_Extra_Info;
};