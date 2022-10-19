import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import DonateStatus from '../components/Stripe/DonateLogic/MoneyStatus';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const MoneyStatusContainer = ({type}) => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
        <Elements stripe={stripePromise}>
          <DonateStatus type={type}/>
        </Elements>
      </Box>
    </Container>
  );
};

export default MoneyStatusContainer;
