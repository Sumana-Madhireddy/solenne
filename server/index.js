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

dotenv.config();
const { User, Product, Cart, CartItem } = db;
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
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains userId
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const saltRounds = 10;
app.post('/signup', async (req,res) => {
    const {username, email, password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    try {
        const user = await User.create({username, email, password: hashedPassword});
        res.status(201).json(user);
    } catch (error) {
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
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error during sign in' });
    }
});

app.get('/products',async (req,res)=>{
    try {
        const products = await Product.findAll();
        // console.log("products -- ",products);
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
      // Find the cart item by ID and ensure it exists
      const cartItem = await CartItem.findOne({ where: { cartItemId } });

      if (!cartItem) {
          return res.status(404).json({ error: 'Cart item not found' });
      }

      // Update the quantity of the cart item
      cartItem.quantity = quantity;
      await cartItem.save();

      // Fetch the updated cart to return to the frontend
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

app.post('/create-checkout-session', async (req, res) => {
  const {cartItems} = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map(item=>({
        price_data:{
          currency: 'usd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price*100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/checkout-success`,
      cancel_url: `${req.headers.origin}/cart`,
  });
    res.send({url: session.url});
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));
