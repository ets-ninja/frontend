import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import PaymentStatus from '../components/Stripe/PaymentStatus';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const StripeStatusContainer = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
        <Elements stripe={stripePromise}>
          <PaymentStatus />
        </Elements>
      </Box>
    </Container>
  );
};

export default StripeStatusContainer;
