'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Users', 'username');
    await queryInterface.addColumn('Users', 'firstName',{
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'lastName',{
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'role',{
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user',
    });
    
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.addColumn('Users', 'username', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   unique: true,
    // }),
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
    await queryInterface.removeColumn('Users', 'role');
  }
};
