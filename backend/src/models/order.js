'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Order.init({
    orderCode: DataTypes.STRING,
    feeShip: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    paymentMethod: DataTypes.STRING,
    cancelOrder: DataTypes.STRING,
    couponId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true
  });
  return Order;
};