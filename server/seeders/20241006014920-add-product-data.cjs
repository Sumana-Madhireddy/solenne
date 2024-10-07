'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',[
      {
        name: 'Lounge Tunic / Black',
        img: 'http://localhost:5000/assets/Lounge_Tunic_black.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lounge Tunic / Blue',
        img: 'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lounge Tunic / Cream',
        img: 'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '40.00',
        details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sonia Skirt',
        img: 'http://localhost:5000/assets/Sonia_Skirt.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
