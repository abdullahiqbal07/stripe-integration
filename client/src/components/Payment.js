
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; // Payment form component

const stripePromise = loadStripe('pk_test_51QOjCzHzln68hatB4wde3NFsV660BPTMNy2XAjUxQFVOqhZ5eqslV8TD6cBYCOOmMFcxBsi816aza4PYMvYGW5mb00vFjvvAyo'); // Replace with your Stripe Publishable Key

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
