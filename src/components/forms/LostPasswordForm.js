import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import request from '../../hooks/useRequest';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const LostPasswordForm = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { loading, sendRequest } = request();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async data => {
    data.email = data.email.toLowerCase();
    try {
      await sendRequest('api/auth/restore', 'POST', data);
    } catch (err) {
      return;
    }
    setIsSuccessful(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isSuccessful ? (
        <FormSuccessful
          title="Email successfully send"
          subtitle="Check your mail box"
          navigateTo="/"
          buttonText="To main page"
        />
      ) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <Typography variant="h4" align="center">
            Restore password
          </Typography>
          <Stack m={2} spacing={2}>
            <TextField
              type="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              label="Your Email"
              autoComplete="email"
              error={!!errors.email}
            />
            <Button type="submit" variant="contained">
              Restore Password
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default LostPasswordForm;
