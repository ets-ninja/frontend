import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ConfirmEmailForm from '@components/forms/ConfirmEmailForm';

const ConfirmEmail = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
        <Typography variant="h4" align="center">
          Confirm Email
        </Typography>
        <ConfirmEmailForm />
      </Box>
    </Container>
  );
};

export default ConfirmEmail;
