'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product_Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Product_Gallery.init({
    image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_Gallery',
    freezeTableName: true
  });
  return Product_Gallery;
};