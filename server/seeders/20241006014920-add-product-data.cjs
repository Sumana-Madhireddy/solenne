// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('Products',[
//       {
//         name: 'Lounge Tunic / Black',
//         img: 'http://localhost:5000/assets/Lounge_Tunic_black.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/ulihu-charcoal-silk-linen-tunic_DETAIL.jpg', 
//           'http://localhost:5000/assets/ulihu-charcoal-silk-linen-tunic_0326-v1-FINAL-copy.jpg',
//           'http://localhost:5000/assets/Lounge_Tunic_black.jpg']),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '50.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Lounge Tunic / Blue',
//         img: 'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/ulihu-blue-linen-tunic_DETAIL.jpg', 
//           'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',]),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '50.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Lounge Tunic / Cream',
//         img: 'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/lauren-winter-natural-dress_DETAIL.jpg', 
//           'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg']),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '40.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Sonia Skirt',
//         img: 'http://localhost:5000/assets/Sonia_Skirt.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/Sonia_Skirt_zoom.jpg', 
//           'http://localhost:5000/assets/Sonia_Skirt.jpg',]),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '50.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Poplin Chef White Shirt',
//         img: 'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/kimem-poplin-chef-shirt-white_DETAIL.jpg', 
//           'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg',]),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '50.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Terra Cotta Studio Maroon Top',
//         img: 'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg',
//         thumbnails: JSON.stringify([
//           'http://localhost:5000/assets/lauren-winter-studio-top-terracotta_DETAIL.jpg', 
//           'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg',]),
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         price: '50.00',
//         details: JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low']),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ])
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Products', null, {});
//   }
// };


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Lounge Tunic / Black',
        img: 'http://localhost:5000/assets/Lounge_Tunic_black.jpg',
        thumbnails: [
          'http://localhost:5000/assets/ulihu-charcoal-silk-linen-tunic_DETAIL.jpg', 
          'http://localhost:5000/assets/ulihu-charcoal-silk-linen-tunic_0326-v1-FINAL-copy.jpg',
          'http://localhost:5000/assets/Lounge_Tunic_black.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lounge Tunic / Blue',
        img: 'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',
        thumbnails: [
          'http://localhost:5000/assets/ulihu-blue-linen-tunic_DETAIL.jpg', 
          'http://localhost:5000/assets/Lounge_Tunic_blue.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lounge Tunic / Cream',
        img: 'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg',
        thumbnails: [
          'http://localhost:5000/assets/lauren-winter-natural-dress_DETAIL.jpg', 
          'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '40.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sonia Skirt',
        img: 'http://localhost:5000/assets/Sonia_Skirt.jpg',
        thumbnails: [
          'http://localhost:5000/assets/Sonia_Skirt_zoom.jpg', 
          'http://localhost:5000/assets/Sonia_Skirt.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poplin Chef White Shirt',
        img: 'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg',
        thumbnails: [
          'http://localhost:5000/assets/kimem-poplin-chef-shirt-white_DETAIL.jpg', 
          'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Terra Cotta Studio Maroon Top',
        img: 'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg',
        thumbnails: [
          'http://localhost:5000/assets/lauren-winter-studio-top-terracotta_DETAIL.jpg', 
          'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg'
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: ['100% Cotton', 'Machine wash cold', 'Tumble dry low'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
