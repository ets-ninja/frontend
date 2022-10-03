import React, { useEffect, useState, useCallback } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import request from '../../hooks/useRequest';

import SetupForm from '../forms/Stripe/SetupFrom';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const AddPaymentMethod = () => {
  const { loading, sendRequest } = request();

  const [setupIntent, setSetupIntent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await createSetupIntent();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSetupIntent = useCallback(async () => {
    const data = await sendRequest('api/payment/setup_secret', 'POST');
    console.log(data);
    setSetupIntent(data);
  }, [sendRequest]);

  if (loading || !setupIntent?.client_secret) {
    return <LoadingSpinner />;
  } else {
    const options = {
      clientSecret: setupIntent?.client_secret,
      appearance: {
        theme: 'flat',
      },
    };
    return (
      <>
        <Elements stripe={stripePromise} options={options}>
          <SetupForm />
        </Elements>
      </>
    );
  }
};

export default AddPaymentMethod;
