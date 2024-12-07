import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './models/index.js'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { group } from 'console';

dotenv.config();
const { User, Product, Cart, CartItem, Order, OrderItem, Message } = db;
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

const CLIENT_URL = 'http://localhost:PORT';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const __filename = fileURLToPath(import.meta.url);
console.log("__filename",__filename);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("token",token);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
    console.log("auth");
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    console.log("un auth");
  }
};

app.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Unauthorized' });

  try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      // Generate a new access token
      const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
      
      res.json({ accessToken: newAccessToken });
  } catch (error) {
      console.error('Invalid refresh token:', error);
      res.status(403).json({ error: 'Invalid refresh token' });
  }
});


const saltRounds = 10;
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
      const user = await User.create({
        firstName: firstName, 
        lastName: lastName,   
        email,
        password: hashedPassword,
        role: 'user',
      });
      res.status(201).json(user);
  } catch (error) {
      console.error(error); 
      res.status(400).json({ error: 'Error creating user' });
  }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
      const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
      res.json({ accessToken, refreshToken, firstName: user.firstName, lastName: user.lastName, role: user.role, email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Error during sign in' });
    }
});

app.get('/products',async (req,res)=>{
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

app.get('/products/:id',async (req,res)=>{
  const { id } = req.params;
  try {
      // const product = await Product.findByPk(id);
      const product = await Product.findOne({ where: { id } }); 
      // console.log("Fetched product with thumbnails:", product); 
      if(product){
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'An error occurred while fetching product' });
  }
});

// Add Item to Cart
app.post('/cart/add', authenticateUser, async (req, res) => { // Corrected endpoint and middleware
  const { productId, quantity, size } = req.body;
  const userId = req.user.userId; // Retrieve userId from authenticated user
  console.log('userId-',userId);
  try {
    // Find or create cart for the user
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Add item to the cart
    const cartItem = await CartItem.create({
      cartId: cart.cartId,
      productId,
      quantity,
      size,
    }, {
      include: [{ model: Product, as: 'product' }]  
    });
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Get Cart Items for User
app.get('/cart', authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ 
        model: CartItem, 
        as: 'items', 
        include: [{
        model: Product,
        as: 'product',
        attributes: ['id','name', 'img','price']
      }], 
    }],
    });
    res.json(cart || { items: [] });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Error retrieving cart' });
  }
});

// Remove a specific item from the cart
app.delete('/cart/remove/:cartItemId', authenticateUser, async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user.userId;
  
  try {
    // Find the cart item by ID and ensure it belongs to the user's cart
    const cartItem = await CartItem.findOne({
      where: { cartItemId },
      include: [{ model: Cart, as: 'cart', where: { userId } }],
    });
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found or does not belong to user' });
    }
    
    // Delete the item from the cart
    await cartItem.destroy();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

app.put('/cart/update/:cartItemId', authenticateUser, async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  try {
      const cartItem = await CartItem.findOne({ where: { cartItemId } });
      if (!cartItem) {
          return res.status(404).json({ error: 'Cart item not found' });
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      const updatedCart = await Cart.findOne({
          where: { userId: req.user.userId },
          include: [{
              model: CartItem,
              as: 'items',
              include: [{ model: Product, as: 'product' }]
          }]
      });

      res.json(updatedCart);
  } catch (error) {
      console.error('Error updating cart item quantity:', error);
      res.status(500).json({ error: 'Error updating cart item quantity' });
  }
});


// Clear all items from the user's cart
app.delete('/cart/clear', authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    // Delete all items from the user's cart
    await CartItem.destroy({ where: { cartId: cart.cartId } });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Error clearing cart' });
  }
});

app.post('/orders/create', authenticateUser, async (req, res) => {
  const { items, totalAmount, paymentId } = req.body; 
  const userId = req.user.userId; 
  
  try {
    // Create the order
    const newOrder = await Order.create({ userId, totalAmount, paymentId, status: 'Paid' });

    // Add order items
    const orderItems = items.map(item => ({
      orderId: newOrder.orderId,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price, 
      size: item.size,
    }));
    await OrderItem.bulkCreate(orderItems);

    // Clear the user's cart
    await CartItem.destroy({ where: { cartId: userId } });

    res.status(201).json({ orderId: newOrder.orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/orders/:orderId', authenticateUser, async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId; // Assuming req.user.userId is set by your auth middleware

  try {
      // Fetch the order details and include items and product details
      const order = await Order.findOne({
          where: {
              orderId,
              userId, // Ensure the order belongs to the authenticated user
          },
          include: [
              {
                  model: OrderItem,
                  as: 'items',
                  include: [
                      {
                          model: Product,
                          as: 'product',
                          attributes: ['id','name', 'img', 'price'], // Include any necessary product attributes
                      },
                  ],
              },
          ],
      });

      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
          orderId: order.orderId,
          status: order.status,
          totalAmount: order.totalAmount,
          items: order.items.map(item => ({
              product: {
                  name: item.product.name,
                  img: item.product.img,
              },
              quantity: item.quantity,
              price: item.price,
              size: item.size,
          })),
      });
  } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'An error occurred while fetching order details' });
  }
});

app.get('/orders', authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, as: 'items', include: ['product'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


app.post('/create-checkout-session', authenticateUser, async (req, res) => {
  const { cartItems, totalAmount } = req.body;
  const userId = req.user.userId;

  try {
    // Step 1: Create an order in the database
    const newOrder = await Order.create({
      userId,
      totalAmount,
      status: 'Pending',
      paymentId: null,
    });

    // Step 2: Add items to the OrderItems table
    const orderItemsData = cartItems.map(item => ({
      orderId: newOrder.orderId,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      size: item.size,
    }));
    await OrderItem.bulkCreate(orderItemsData);

    // Step 3: Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.product.name },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/order-summary/${newOrder.orderId}`, 
      cancel_url: `${req.headers.origin}/cart`,
    });
    const userCart = await Cart.findOne({ where: { userId } });
    if (userCart) {
      await CartItem.destroy({ where: { cartId: userCart.cartId } });
      console.log(`Cleared cart items for cartId: ${userCart.cartId}`);
    } else {
      console.error('No cart found for user');
    }
    res.send({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;

  try {
      const newMessage = await Message.create({
          name,
          email,
          message,
      });

      res.status(201).json({ success: true, message: 'Message saved', data: newMessage });
  } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to save message', details: error.message });
  }
});

// Admin apis 
app.post('/add-product',authenticateUser, async (req, res) => {
  try {
    const {name, img, thumbnails, description, price, details, category, material, color, gender} = req.body;
    if (!name || !img || !description || !price || !details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newProduct = await Product.create({name, img, thumbnails, description, price, details, category, material, color, gender});
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('Error creating product:', error);
  }
});

app.get('/all-orders', authenticateUser, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'items', include: ['product'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/admin/order-items', authenticateUser, async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      attributes: [
        'productId', 
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalQuantity'],
        [
          db.sequelize.fn('SUM', 
            db.sequelize.literal('quantity * "OrderItem"."price"')
          ),
          'totalRevenue'
        ],
        [db.sequelize.col('product.name'), 'productName'],
        [db.sequelize.col('product.category'), 'productCategory'],
        [db.sequelize.col('product.material'), 'productMaterial'],
        [db.sequelize.col('product.color'), 'productColor'],
        [db.sequelize.col('product.gender'), 'productGender'],
      ],
      group: [
        'OrderItem.productId', 
        'product.name', 
        'product.category', 
        'product.material', 
        'product.color', 
        'product.gender'
      ], // Grouping by all relevant columns
      include: [{
        model: Product, 
        as: 'product', 
        attributes: ['name', 'category', 'material', 'color', 'gender']
      }],
      raw: true,
      logging: console.log, // This will log the SQL query to the console
    });

    const result = orderItems.map(item => ({
      productId: item.productId,
      productName: item.productName,
      productCategory: item.productCategory,
      productMaterial: item.productMaterial,
      productColor: item.productColor,
      productGender: item.productGender,
      totalQuantity: item.totalQuantity,
      totalRevenue: item.totalRevenue,
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Failed to fetch order items' });
  }
});


app.get('/admin/all-users', authenticateUser, async (req, res) => {
  try {
    const users = await User.findAll({
      // include: [{ model: Cart, as: 'cart' }],
      user: [['createdAt', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/admin/edit-user/:id', authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { firstName, lastName, role, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const updatedData = {};
    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    if (role) updatedData.role = role;
    if (email) updatedData.email = email;

    await user.update(updatedData);
    res.json({ message: 'User updated successfully.', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

app.put('/admin/edit-product/:id', authenticateUser, async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, category, material, color, gender, price, details, img, thumbnails, description } = req.body;

  try {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    const updatedData = {};
    if (name) updatedData.name = name;
    if (category) updatedData.category = category;
    if (material) updatedData.material = material;
    if (color) updatedData.color = color;
    if (gender) updatedData.gender = gender;
    if (price) updatedData.price = price;

    if (details) updatedData.details = Array.isArray(details) ? details : JSON.parse(details);
    if (img) updatedData.img = img;
    if (thumbnails) updatedData.thumbnails = Array.isArray(thumbnails) ? thumbnails : JSON.parse(thumbnails);
    if (description) updatedData.description = description;

    await product.update(updatedData);

    res.json({ message: 'Product updated successfully.', product });
  } catch (error) {
    console.error('Error updating product:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    res.status(500).json({ error: 'Failed to update product.' });
  }
});




app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));
