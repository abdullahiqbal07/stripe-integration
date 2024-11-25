import express from 'express';
import cors from 'cors';
import 'dotenv/config'

import Stripe from 'stripe';
const app = express();

app.use(express.json())
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_KEY);

app.post('/checkout', async(req, res) => {
    const { product } = req.body
    console.log(product)
    const lineItems = product.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.dish,
                images:[product.imgdata]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
      });

      res.send({status:"success", id:session.id});
}); 


app.listen(8080, ()=>{
    console.log('listening on http://localhost:8080')
})