import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url'; // Use `pathToFileURL` to format paths correctly
import configFile from '../config/config.json' assert { type: 'json' };
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically read and import model files using file:// URLs
const models = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .map(async file => {
    // Convert the file path to a file:// URL for Windows compatibility
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const { default: model } = await import(modelPath);
    return model(sequelize, Sequelize.DataTypes);
  });

const initializedModels = await Promise.all(models);

initializedModels.forEach(model => {
  db[model.name] = model;
});

// Set associations for models if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize and db models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;



// models/index.js
// import { Sequelize } from 'sequelize';
// import configFile from '../config/config.json' assert { type: 'json' };

// // Import each model directly
// import UserModel from './user.js';
// import ProductModel from './product.js';
// import CartModel from './cart.js';
// import CartItemModel from './cartItem.js';


// const env = process.env.NODE_ENV || 'development';
// const config = configFile[env];

// // Initialize Sequelize
// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// const db = {};

// // Initialize models
// db.User = UserModel(sequelize, Sequelize.DataTypes);
// db.Product = ProductModel(sequelize, Sequelize.DataTypes);
// db.Cart = CartModel(sequelize, Sequelize.DataTypes);
// db.CartItem = CartItemModel(sequelize, Sequelize.DataTypes);

// // Set up associations manually
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Export the db object and Sequelize instance
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
