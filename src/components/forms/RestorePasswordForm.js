import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import request from '../../hooks/useRequest';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const RestorePasswordForm = ({ token, id }) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { loading, sendRequest } = request();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async data => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
      return;
    }
    try {
      await sendRequest(`api/auth/restore/${token}/${id}`, 'POST', data);
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
          subtitle="Your Password was successfully restored"
          navigateTo="/login"
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
