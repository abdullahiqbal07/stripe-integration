// client/src/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded yet!');
      setLoading(false);
      return;
    }

    // Call your backend to create a payment intent
    const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
      amount: 1000, // Amount in cents ($10)
      currency: 'usd',
    });


    const { clientSecret } = data;

    // Confirm payment on the client side
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });


    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
    }

    setLoading(false);
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#a0aec0', // Tailwind gray-400
        },
      },
      invalid: {
        color: '#e53e3e', // Tailwind red-600
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h2>
      <div className="border border-gray-300 p-3 rounded-md mb-4">
        <CardElement options={cardStyle} />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 px-4 rounded-lg text-white ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </form>
  );
}

export default CheckoutForm;
