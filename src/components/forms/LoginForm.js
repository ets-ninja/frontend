import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import { loginUser } from '../../redux/user/userActions';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const LoginForm = () => {
  const { loading, userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [navigate, userInfo]);

  const submitForm = data => {
    dispatch(loginUser(data));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
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
            autoComplete="password"
            error={!!errors.password}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingX="20px"
      >
        <Grid item xs={8}>
          <Typography variant="caption">
            <Link
              href="#"
              onClick={() => navigate('/register')}
              underline="hover"
              color="black"
            >
              {'Don`t have an account? Signup'}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="caption"
            display="flex"
            justifyContent="flex-end"
          >
            <Link
              href="#"
              onClick={() => navigate('/lost-password')}
              underline="hover"
              color="black"
            >
              {'Lost password'}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
