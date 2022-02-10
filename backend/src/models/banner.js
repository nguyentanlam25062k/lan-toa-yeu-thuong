'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Banner.init({
    descFirst: DataTypes.STRING,
    descSecond: DataTypes.STRING,
    descThird: DataTypes.STRING,
    imageFirst: DataTypes.STRING,
    imageSecond: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Banner',
    freezeTableName: true
  });
  return Banner;
};