import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, TextField, Button, Typography } from '@mui/material';

import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import {
  confirmEmail,
  requestNewCorfirmEmail,
} from '../../redux/user/userActions';
import { resetSucces } from '../../redux/user/userSlice';

const ConfirmEmailForm = () => {
  const { loading, success, userInfo, error } = useSelector(
    state => state.user,
  );
  const [hasError, setHasError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSucces());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, [error]);

  const submitForm = data => {
    dispatch(confirmEmail({ code: data.code, userId: userInfo.id }));
  };

  const requestAnotherEmail = () => {
    dispatch(requestNewCorfirmEmail(userInfo.id));
  };

  if (loading) {
    return <LoadingSpinner />;
  } else if (success) {
    return (
      <FormSuccessful
        subtitle="Your Email was successfully confirmed"
        navigateTo="/profile"
        buttonText="Go to your profile"
      />
    );
  } else if (hasError) {
    return <Typography align="center">{error.message || error}</Typography>;
  }

  return (
    <Stack m={2} spacing={2}>
      <Typography align="center">
        To finish your registration please check your email. Enter a code, that
        we have sent you to <b>{userInfo?.email}</b>
        <br />
        This code will expire in <b>1 hour.</b>
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <TextField
          fullWidth
          type="text"
          {...register('code', {
            required: 'Code is required',
            minLength: {
              value: 8,
              message: 'Code is too short',
            },
            maxLength: {
              value: 8,
              message: 'Code is too long',
            },
          })}
          label="Enter a code here"
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '100%',
            mt: 2,
          }}
        >
          Confirm Email
        </Button>
      </form>
      <Typography>Did not receive a message or code is expired? 👇🏻</Typography>
      <Button
        type="submit"
        variant="outlined"
        onClick={requestAnotherEmail}
        sx={{
          width: '100%',
        }}
      >
        Send another one
      </Button>
    </Stack>
  );
};

export default ConfirmEmailForm;
