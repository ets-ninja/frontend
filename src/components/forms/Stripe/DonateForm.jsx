import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import request from '../../../hooks/useRequest';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import LoadingSpinner from '../../UIElements/LoadingSpinner';

import { useDispatch, useSelector } from 'react-redux';
import { get_jar_finance_by_id } from '../../../redux/jar/basketActions';

const DonateForm = props => {
  const { loading, sendRequest } = request();
  let { basketID } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  let paymentSecret;
  const submitForm = async data => {
    if (data.amount <= 0 || data.last4.length !== 4) {
      alert('Data is inappropriate!');
      return;
    }
    try {
      data.amount = data.amount * 100;
      paymentSecret = await sendRequest(
        'api/payment/payment_secret',
        'POST',
        data,
      );
    } catch (err) {
      return;
    }

    let payment;
    try {
      payment = await sendRequest('api/payment/donate', 'POST', {
        paymentIntentId: paymentSecret.id,
        basketId: basketID,
      });
    } catch (err) {
      return;
    }

    // it will be better if this won't be there in future
    dispatch(get_jar_finance_by_id({ id: basketID }));

    if (payment.status === 'success') {
      navigate(`/donate-status`);
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
