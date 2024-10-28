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
const { User, Product } = db;
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

const CLIENT_URL = 'http://localhost:PORT';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = Stripe('sk_test_51QEr6hGprWRUDCQ173zpbE95jfyANxwj33S5E4qmLiam9hMfHV2vdIQVOtBr8VlShjIBEJMqsQ5Q3lCqQg99ERt800Oyp1fZcS');

const __filename = fileURLToPath(import.meta.url);
console.log("__filename",__filename);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
        console.log("products -- ",products);
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
      console.log("Fetched product with thumbnails:", product); 
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


app.post('/create-checkout-session', async (req, res) => {
  const {cartItems} = req.body;
  console.log('Received checkout request:', cartItems.cart);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.cart.map(item=>({
        price_data:{
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price*100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/checkout-success`,
      cancel_url: `${req.headers.origin}/cart`,
  });
  console.log('Stripe session created:', session);
    res.send({url: session.url});
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));
