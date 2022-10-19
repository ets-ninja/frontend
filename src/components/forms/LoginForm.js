import React, { useEffect } from 'react';
import {
  useSearchParams,
  useNavigate,
  Link as RouterLink,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  Stack,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from '@mui/material';

import { login } from '../../redux/auth/authActions';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const LoginForm = () => {
  const { loading, isLoggedIn } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const basketId = searchParams.get('basketId');

    if (basketId) {
      localStorage.setItem('redirectToBank', basketId);
    }
    const redirectToBank = localStorage.getItem('redirectToBank');

    if (redirectToBank && isLoggedIn) {
      navigate('/public');
    }

    if (isLoggedIn && userInfo?.status === 'active') {
      navigate('/wishlist');
    } else if (!isLoggedIn && userInfo?.status === 'pending') {
      navigate('/confirm-email');
    }
  }, [navigate, isLoggedIn, userInfo]);

  const submitForm = data => {
    dispatch(login(data));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
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
              component={RouterLink}
              to="/register"
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
              component={RouterLink}
              to="/lost-password"
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
