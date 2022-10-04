import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

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
          setMessage(
            <>
              <Typography variant="h5" align="center">
                Success! Your payment method has been saved.
              </Typography>
              <CheckCircleOutlineIcon
                style={{ fontSize: '50px', color: '#0CD100' }}
              />
            </>,
          );
          break;

        case 'processing':
          setMessage(
            <>
              <Typography variant="h5" align="center">
                Processing payment details. We'll update you when processing is
                complete.
              </Typography>
              <LoopIcon style={{ fontSize: '50px', color: '#0003D1' }} />
            </>,
          );
          break;

        case 'requires_payment_method':
          setMessage(
            <>
              <Typography variant="h5" align="center">
                Failed to process payment details. Please try another payment
                method.
              </Typography>
              <CancelIcon style={{ fontSize: '50px', color: 'red' }} />
            </>,
          );
          break;
        default:
          setMessage(
            <>
              <Typography variant="h5" align="center">
                Failed to process payment details.
              </Typography>
              <CancelIcon style={{ fontSize: '50px', color: 'red' }} />
            </>,
          );
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
      {message}
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
