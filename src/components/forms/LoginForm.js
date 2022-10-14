import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import { login } from '../../redux/auth/authActions';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const LoginForm = () => {
  const { loading, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const basketId = searchParams.get('basketId');

  console.log(basketId)

  if (basketId) {
    localStorage.setItem('redirectToBank', basketId);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const redirectToBank = localStorage.getItem('redirectToBank');
    if (redirectToBank && isLoggedIn) {
      navigate('/public');
      // localStorage.removeItem('redirectToBank')
    } else if (isLoggedIn) {
      navigate('/wishlist');
    }
  }, [navigate, isLoggedIn]);

  const submitForm = data => {
    dispatch(login(data));
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
          <Typography align="center" paragraph={true}>
            or
          </Typography>
          <Button
            variant="contained"
            href={`${process.env.REACT_APP_API_URL}/api/auth/google`}
          >
            Login with Google
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
