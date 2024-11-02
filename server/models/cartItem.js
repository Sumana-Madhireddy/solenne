import {Model, DataTypes} from 'sequelize';

export default (sequelize) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.Cart, {foreignKey: 'cartId', as: 'cart'});
            CartItem.belongsTo(models.Product, {foreignKey: 'productId', as: 'product'});
        }
    }
    CartItem.init({
        cartItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts',
                key: 'cartId',
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,
        modelName: 'CartItem',
        tableName: 'CartItems',
    });
    return CartItem;
}