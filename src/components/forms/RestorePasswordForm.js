import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { request } from '../../redux/request/requestAction';
import { Typography } from '@mui/material';
import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const RestorePasswordForm = ({ token, id }) => {
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
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
      return;
    }
    dispatch(
      request({
        method: 'POST',
        url: `api/auth/restore/${token}/${id}`,
        body: data,
      }),
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isSuccessful ? (
        <FormSuccessful
          subtitle="Your Password was successfully restored"
          navigateTo="/"
          buttonText="To login page"
        />
      ) : (
        <form onSubmit={handleSubmit(submitForm)}>
          <Typography variant="h4" align="center">
            Type your new password
          </Typography>
          <Stack container m={2} spacing={2}>
            <TextField
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              label="Password"
              autoComplete="new-password"
              error={!!errors.password}
            />
            <TextField
              type="password"
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
              })}
              label="Confirm Password"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
            />
            <Button type="submit" variant="contained">
              Set new Password
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default RestorePasswordForm;
