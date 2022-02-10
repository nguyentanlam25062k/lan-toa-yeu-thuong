'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product_Extra_Info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      weight: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      ingredient: {
        type: Sequelize.STRING
      },
      expiry: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Product_Extra_Info');
  }
};