import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import LostPasswordForm from '../components/Forms/LostPasswordForm';

const LostPassword = () => {
  return (
    <>
      <Container maxWidth="xs">
        <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
          <LostPasswordForm />
        </Box>
      </Container>
    </>
  );
};

export default LostPassword;
