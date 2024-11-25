import express from 'express';
import cors from 'cors';
import 'dotenv/config'

import Stripe from 'stripe';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
app.use(express.json())
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_KEY);
// const paymentRoutes = require('./routes/paymentRoutes'); // Adjust path as needed


// Middleware
app.use(cors());

// Routes
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));