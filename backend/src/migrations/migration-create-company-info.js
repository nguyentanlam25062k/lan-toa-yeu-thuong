'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Company_Info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      contactTitle: {
        type: Sequelize.STRING
      },
      enterpriseCertificate: {
        type: Sequelize.STRING
      },
      enterpriseCertificateDate: {
        type: Sequelize.DATE
      },
      enterpriseCertificatePlace: {
        type: Sequelize.STRING
      },
      bankAccountName: {
        type: Sequelize.STRING
      },
      bankAccountNumber: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      supportNumber: {
        type: Sequelize.STRING
      },
      supportTechnical: {
        type: Sequelize.STRING
      },
      map: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Company_Info');
  }
};