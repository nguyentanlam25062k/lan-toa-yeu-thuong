'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reset_Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Reset_Password.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reset_Password',
    freezeTableName: true
  });
  return Reset_Password;
};