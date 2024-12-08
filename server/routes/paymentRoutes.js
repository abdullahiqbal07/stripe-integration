// server/routes/paymentRoutes.js
import { Router } from 'express';
import Stripe from 'stripe';
const router = Router();
const stripe = new Stripe(process.env.STRIPE_KEY);


// Route to create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: currency || 'usd',
    });

    console.log(paymentIntent); 

    res.status(200).json({
      clientSecret: paymentIntent.client_secret, // Send client secret to the frontend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
