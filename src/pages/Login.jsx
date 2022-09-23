import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
