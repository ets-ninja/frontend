import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';

const DonateStatus = ({ type }) => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    switch (type) {
      case 'donate':
        setMessage('Your payment is successful.');
        break;
      case 'receive':
        setMessage('Money will be sent to your card soon.');
        break;
      default:
        setMessage('Success!');
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Typography variant="h5" align="center">
        {message}
      </Typography>
      <CheckCircleOutlineIcon style={{ fontSize: '50px', color: '#0CD100' }} />
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </Button>
    </Box>
  );
};

export default DonateStatus;
