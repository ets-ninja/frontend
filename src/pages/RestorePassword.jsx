import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import useQuery from '../hooks/useQuery';
import RestorePasswordForm from '../components/Forms/RestorePasswordForm';

const RestorePassword = () => {
  let query = useQuery();
  return (
    <>
      <Container maxWidth="xs">
        <Box sx={{ boxShadow: 1, borderRadius: 3 }} padding="20px">
          <RestorePasswordForm
            token={query.get('token')}
            id={query.get('id')}
          />
        </Box>
      </Container>
    </>
  );
};

export default RestorePassword;
