'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company_Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Company_Phone.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    companyInfoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Company_Phone',
    freezeTableName: true
  });
  return Company_Phone;
};