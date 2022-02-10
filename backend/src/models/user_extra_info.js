'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Extra_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User_Extra_Info.init({
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    ward: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Extra_Info',
    freezeTableName: true
  });
  return User_Extra_Info;
};