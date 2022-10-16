import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import request from '../../hooks/useRequest';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LoadingSpinner from '../UIElements/LoadingSpinner';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);

const DonateForm = () => {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const { loading, sendRequest } = request();
  let { basket } = useParams();

  const {
    register,
    handleSubmit,
  } = useForm();


  const submitForm = async data => {
    if (data.amount <= 0 || data.last4.length !== 4) {
      alert('Data is inappropriate!');
      return;
    }
    try {
      data.amount = data.amount * 100;
      const paymentSecret = await sendRequest(
        'api/payment/payment_secret',
        'POST',
        data,
      );
      setPaymentIntent(paymentSecret);
    } catch (err) {
      return;
    }

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
        await sendRequest( 'api/payment/donate', 'POST', { paymentIntentId: paymentIntent.id, basketId: basket });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack m={2} spacing={2}>
          <TextField
            type="number"
            {...register('amount', {
              required: true,
              min: {
                value: 0.1,
                message: 'Amount is incorrect',
              },
            })}
            label="Amount"
            autoComplete=""
          />
          <TextField
            type="text"
            {...register('description', {
              maxLength: 300,
            })}
            label="Comment"
          />
          <TextField
            type="number"
            {...register('last4', {
              maxLength: 4,
              minLength: 4,
            })}
            label="Card last 4 numbers"
          />
          <Button type="submit" variant="contained">
            Submit donation
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default DonateForm;
