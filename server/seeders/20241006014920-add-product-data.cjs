'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      // {
      //   name: 'Lounge Tunic / Black',
      //   img: 'http://localhost:5000/assets/Lounge_Tunic_black.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Lounge_Tunic_black.jpg',
      //     'http://localhost:5000/assets/ulihu-charcoal-silk-linen-tunic_DETAIL.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '50.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: 'Lounge Tunic / Blue',
      //   img: 'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Lounge_Tunic_blue.jpg',
      //     'http://localhost:5000/assets/ulihu-blue-linen-tunic_DETAIL.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '50.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: 'Lounge Tunic / Cream',
      //   img: 'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Lounge_Tunic_Cream.jpg',
      //     'http://localhost:5000/assets/lauren-winter-natural-dress_DETAIL.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '40.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: 'Sonia Skirt',
      //   img: 'http://localhost:5000/assets/Sonia_Skirt.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Sonia_Skirt.jpg',
      //     'http://localhost:5000/assets/Sonia_Skirt_zoom.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '50.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: 'Poplin Chef White Shirt',
      //   img: 'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Poplin_Chef_Shirt.jpg',
      //     'http://localhost:5000/assets/kimem-poplin-chef-shirt-white_DETAIL.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '50.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   name: 'Terra Cotta Studio Maroon Top',
      //   img: 'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg',
      //   thumbnails: Sequelize.literal(`'${JSON.stringify([
      //     'http://localhost:5000/assets/Terra_Cotta_Studio_Top.jpg',
      //     'http://localhost:5000/assets/lauren-winter-studio-top-terracotta_DETAIL.jpg', 
      //   ])}'`),
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   price: '50.00',
      //   details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        name: 'Jacky Trousers',
        img: 'http://localhost:5000/assets/Jacky_Trousers.jpg',
        thumbnails: Sequelize.literal(`'${JSON.stringify([
          'http://localhost:5000/assets/Jacky_Trousers.jpg', 
        ])}'`),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Romy Trousers',
        img: 'http://localhost:5000/assets/Romy_Trousers.jpg',
        thumbnails: Sequelize.literal(`'${JSON.stringify([
          'http://localhost:5000/assets/Romy_Trousers.jpg',
          'http://localhost:5000/assets/Romy_Trousers_Details.jpg', 
        ])}'`),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lauren winter wide pant',
        img: 'http://localhost:5000/assets/Lauren_winter_wide_pant_natural.jpg',
        thumbnails: Sequelize.literal(`'${JSON.stringify([
          'http://localhost:5000/assets/Lauren_winter_wide_pant_natural.jpg',
          'http://localhost:5000/assets/Lauren_winter_wide_pant_natural_DETAIL.jpg', 
        ])}'`),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ulihu blue linen long short',
        img: 'http://localhost:5000/assets/Ulihu_blue_linen_long_short.jpg',
        thumbnails: Sequelize.literal(`'${JSON.stringify([
          'http://localhost:5000/assets/Ulihu_blue_linen_long_short.jpg',
          'http://localhost:5000/assets/Ulihu_blue_linen_long_short_DETAIL.jpg', 
        ])}'`),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kimem long pleated skirt black',
        img: 'http://localhost:5000/assets/Kimem_long_pleated_skirt_black.jpg',
        thumbnails: Sequelize.literal(`'${JSON.stringify([
          'http://localhost:5000/assets/Kimem_long_pleated_skirt_black.jpg',
          'http://localhost:5000/assets/Kimem_long_pleated_skirt_black_DETAIL.jpg', 
        ])}'`),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '50.00',
        details: Sequelize.literal(`'${JSON.stringify(['100% Cotton', 'Machine wash cold', 'Tumble dry low'])}'`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
