'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Company_Info.init({
    name: DataTypes.STRING,
    contactTitle: DataTypes.STRING,
    enterpriseCertificate: DataTypes.STRING,
    enterpriseCertificateDate: DataTypes.DATE,
    enterpriseCertificatePlace: DataTypes.STRING,
    bankAccountName: DataTypes.STRING,
    bankAccountNumber: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    supportNumber: DataTypes.STRING,
    supportTechnical: DataTypes.STRING,
    map: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company_Info',
    freezeTableName: true
  });
  return Company_Info;
};