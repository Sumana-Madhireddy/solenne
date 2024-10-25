import { Op } from 'sequelize'; // Import Sequelize operators
import db from './models/index.js'; // Ensure you are importing from index.js
const { Product } = db; // Extract Product model from the db object

// Function to remove duplicates based on the 'name' column
const removeDuplicates = async () => {
  try {
    const duplicates = await Product.findAll({
      attributes: ['name'],
      group: ['name'],
      having: db.sequelize.literal('COUNT(*) > 1'),
    });

    for (let duplicate of duplicates) {
      const products = await Product.findAll({
        where: {
          name: duplicate.name
        },
        order: [['createdAt', 'DESC']] // Keep the first, delete others
      });

      const [firstProduct, ...otherProducts] = products;
      const otherProductIds = otherProducts.map(p => p.id);

      if (otherProductIds.length > 0) {
        await Product.destroy({
          where: {
            id: {
              [Op.in]: otherProductIds
            }
          }
        });
        console.log(`Removed ${otherProductIds.length} duplicates for product: ${duplicate.name}`);
      }
    }
  } catch (error) {
    console.error('Error removing duplicates:', error);
  }
};

removeDuplicates();
