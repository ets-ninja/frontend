import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';

const PaymentStatus = () => {
  const stripe = useStripe();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret',
    );

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      switch (setupIntent.status) {
        case 'succeeded':
          setMessage('Success! Your payment method has been saved.');
          break;

        case 'processing':
          setMessage(
            "Processing payment details. We'll update you when processing is complete.",
          );
          break;

        case 'requires_payment_method':
          setMessage(
            'Failed to process payment details. Please try another payment method.',
          );
          break;
        default:
          setMessage('Failed to process payment details.');
          break;
      }
    });
  }, [stripe]);

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
          navigate('/profile');
        }}
      >
        To profile Page
      </Button>
    </Box>
  );
};

export default PaymentStatus;
