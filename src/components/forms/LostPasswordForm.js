import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { request } from '../../redux/request/requestAction';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const LostPasswordForm = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { success, loading } = useSelector(state => state.request);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      setIsSuccessful(true);
    }
  }, [success]);

  const submitForm = data => {
    data.email = data.email.toLowerCase();
    dispatch(request({ method: 'POST', url: 'api/auth/restore', body: data }));
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
