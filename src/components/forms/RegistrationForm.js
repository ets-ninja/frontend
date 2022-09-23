import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { registerUser } from '../../redux/user/userActions';

const RegistrationForm = () => {
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/profile');
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
      return;
    }

    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack container m={2} spacing={2}>
          {error && <h1>Error</h1>}
          {loading && <h1>Loading...</h1>}
          <TextField
            type="text"
            {...register('nickname', {
              required: true,
              maxLength: 70,
            })}
            label="Nickname"
            autoComplete="nickname"
            error={!!errors.nickname}
          />
          <TextField
            type="text"
            {...register('firstName', {
              required: true,
              maxLength: 70,
            })}
            label="First Name"
            autoComplete="given-name"
            error={!!errors.firstName}
          />
          <TextField
            type="text"
            {...register('lastName', {
              required: true,
              maxLength: 70,
            })}
            label="Last Name"
            autoComplete="family-name"
            error={!!errors.lastName}
          />
          <TextField
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            label="Email"
            autoComplete="email"
            error={!!errors.email}
          />
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
            Signup
          </Button>
        </Stack>
      </form>
      <Typography variant="caption">
        <Link
          href="#"
          onClick={() => navigate('/login')}
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
