import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

import { setError } from '../../../redux/request/requestSlice';

import Button from '@mui/material/Button';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_SELF_URL}`,
      },
    });

    if (error) {
      dispatch(setError(error.message));
    } else {
    }
  };
  return (
    <form onSubmit={handleSubmit}>
        {/* open the amount & description input */}
        {/* open the pm list*/}
        {/* add submit button */}
      {/* <PaymentElement />
      <Button variant="contained" type="submit" disabled={!stripe}>
        Submit
      </Button> */}
    </form>
  );
};

export default PaymentForm;
