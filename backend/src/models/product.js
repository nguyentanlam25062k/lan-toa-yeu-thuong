'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    intro: DataTypes.STRING,
    price: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    sold: DataTypes.INTEGER,
    inventory: DataTypes.INTEGER,
    descMarkdown: DataTypes.TEXT('long'),
    descHtml: DataTypes.TEXT('long'),
    userRatingProductId: DataTypes.INTEGER,
    productExtraInfoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true
  });
  return Product;
};