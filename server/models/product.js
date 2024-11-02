import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Product extends Model {
      static associate(models) {
        Product.belongsToMany(models.Cart, {
          through: models.CartItem,
          foreignKey: 'productId',
          otherKey: 'cartId',
        });
      }
    }
  
    Product.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnails: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      details: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products', 
    });
    return Product;
};