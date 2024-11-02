import {Model, DataTypes} from 'sequelize';

export default (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
            Cart.hasMany(models.CartItem, {foreignKey: 'cartId', as: 'items'});
        }
    }
    Cart.init({
        cartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },

    },{
        sequelize,
        modelName: 'Cart',
        tableName: 'Carts',
    });
    return Cart;
};