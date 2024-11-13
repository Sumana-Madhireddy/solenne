'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'material', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'color', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'unisex'),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category');
    await queryInterface.removeColumn('products', 'material');
    await queryInterface.removeColumn('products', 'color');
    await queryInterface.removeColumn('products', 'gender');
  }
};
