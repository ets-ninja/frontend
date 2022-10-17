import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../../hooks/useRequest';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DonateForm from '../../forms/Stripe/DonateForm';

const WithdrawalIndex = () => {
  const [showDonateMenu, setShowDonateMenu] = useState(false);
  const { loading, sendRequest } = request();
  let { basketID } = useParams();

  const data = { basketId: basketID };

  async function handleReceive() {
    try {
      await sendRequest('api/payment/recieve_money', 'POST', { basketId: basketID });
    } catch (err) {
      return;
    }
  }

  return (
    <>
      <Button
        sx={{
          width: 330,
          fontSize: 15,
          mt: 3,
          mb: 3,
          borderRadius: 1,
          backgroundColor: '#5571D8',
          boxShadow: 5,
          color: 'white',
          '&:hover': { backgroundColor: '#111d4a', color: '#EFF0FC' },
        }}
        variant="contained"
        onClick={handleReceive}
      >
        Withdraw money
      </Button>
    </>
  );
};

export default WithdrawalIndex;
