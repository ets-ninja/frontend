import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormSuccessful from '../UIElements/FormSuccessful';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { confirmEmail } from '../../redux/user/userActions';

const ConfirmEmailForm = () => {
  const {loading, success, userInfo, error } = useSelector(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   success &&
  //     userInfo?.id &&
  //     navigate('/confirm-email');
  // }, [navigate, userInfo, success]);

  const submitForm = data => {
    dispatch(confirmEmail({code: data.code, userId: userInfo.id}));
  };

  if (loading) {
    return <LoadingSpinner />;
  }else if(success) {
    return (
      <FormSuccessful
        subtitle="Your Email was successfully confirmed"
      navigateTo="/profile"
      buttonText="Go to your profile"
      />
    )
  }else if (error) {
    return <p>{error.message || error}</p> 
  }   
  
  return (
    <form onSubmit={handleSubmit(submitForm)} novalidate>
          <Typography variant="h4" align="center">
            To finish your registration please check your email.
            Enter a code, that we have sent you to {userInfo.email}
          </Typography>
          <Stack container m={2} spacing={2}>
            <TextField
              type="test"
              {...register('code', {
                required: 'Code is required',
                minLength: {
                  value: 8,
                  message: 'Code is too short'
                },
                maxLength: {
                  value: 8,
                  message: 'Code is too long'
                },
              })}
              label="Enter a code here"
              error={!!errors.code}
              helperText={errors.code?.message}
            />
            <Button type="submit" variant="contained">
              Confirm Email
            </Button>
          </Stack>
    </form>
  )
};

export default ConfirmEmailForm;
