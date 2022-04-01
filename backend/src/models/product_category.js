"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Product_Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      imageId: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      parentId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Product_Category",
      freezeTableName: true
    }
  );
  return Product_Category;
};
