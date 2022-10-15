import React, { useEffect, useState, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import request from '../../../hooks/useRequest';

import PaymentForm from '../../forms/Stripe/PaymentForm';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import Typography from '@mui/material/Typography';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const CreatePayment = () => {
  const { loading, sendRequest } = request();

  const [paymentIntent, setPaymentIntent] = useState(null);
//   inputs amount description and last4
// submit button
// then create payment intent 

  useEffect(() => {
    const fetchData = async () => {
      await createPaymentIntent();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPaymentIntent = useCallback(async () => {
    const data = await sendRequest('api/payment/payment_secret', 'POST');
    setPaymentIntent(data);
  }, [sendRequest]);

  if (loading) {
    return <LoadingSpinner />;
  } else if (!paymentIntent?.client_secret) {
    return (
      <>
        <Typography variant="h5" align="center">
          Loading failed, try again later
        </Typography>
      </>
    );
  } else {
    const options = {
      clientSecret: paymentIntent?.client_secret,
      appearance: {
        theme: 'flat',
      },
    };
    return (
      <>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      </>
    );
  }
};

export default CreatePayment;
