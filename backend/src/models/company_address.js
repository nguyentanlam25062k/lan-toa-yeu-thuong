'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company_Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Company_Address.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    companyInfoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company_Address',
    freezeTableName: true
  });
  return Company_Address;
};