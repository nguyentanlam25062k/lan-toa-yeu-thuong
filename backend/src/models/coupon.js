'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }


  Coupon.init({
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    time: DataTypes.INTEGER,
    dateEnd: DataTypes.STRING,
    typeCoupon: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Coupon',
    freezeTableName: true
  });
  return Coupon;
};