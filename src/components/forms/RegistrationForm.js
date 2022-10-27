import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { registerUser } from '@redux/user/userActions';
import LoadingSpinner from '@components/UIElements/LoadingSpinner';

const RegistrationForm = () => {
  const { loading, success, userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { basketId } = useParams();

  useEffect(() => {
    localStorage.setItem('redirectToBank', basketId);

    success && userInfo?.id && navigate('/confirm-email');
  }, [navigate, userInfo, success]);

  const submitForm = data => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Stack m={2} spacing={2}>
          <TextField
            type="text"
            {...register('publicName', {
              maxLength: 70,
            })}
            label="Nickname"
            autoComplete="nickname"
            error={!!errors.nickname}
          />
          <TextField
            type="text"
            required
            {...register('firstName', {
              required: 'This field is required',
              maxLength: 70,
            })}
            label="First Name"
            autoComplete="given-name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            type="text"
            required
            {...register('lastName', {
              required: 'This field is required',
              maxLength: 70,
            })}
            label="Last Name"
            autoComplete="family-name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            type="email"
            required
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            label="Email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type="password"
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 symbols',
              },
            })}
            label="Password"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            type="password"
            required
            {...register('confirmPassword', {
              validate: value => {
                return (
                  value === getValues('password') || 'Paswords do not match'
                );
              },
            })}
            label="Confirm Password"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained">
            Signup
          </Button>
        </Stack>
      </form>

      <Typography variant="caption">
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          color="black"
          paddingX="20px"
        >
          {'Already have an account? Login'}
        </Link>
      </Typography>
    </>
  );
};

export default RegistrationForm;
