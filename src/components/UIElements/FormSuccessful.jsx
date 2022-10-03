import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FormSuccessful = ({ title, subtitle, navigateTo, buttonText }) => {
  const navigate = useNavigate();
  return (
    <Stack m={1} spacing={1}>
      {title ? (
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      ) : null}
      {subtitle ? (
        <Typography variant="h5" align="center" paddingBottom="10px">
          {subtitle}
        </Typography>
      ) : null}

      {navigateTo ? (
        <Button variant="contained" onClick={() => navigate(navigateTo)}>
          {buttonText}
        </Button>
      ) : null}
    </Stack>
  );
};

export default FormSuccessful;
