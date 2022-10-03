import React, { useEffect, useState, useCallback } from 'react';

import request from '../../hooks/useRequest';

import Divider from '@mui/material/Divider';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentsMethods from './PaymentsMethods';
import AddPaymentMethod from './AddPaymentMethod';
//import AddPaymentMethod from './AddPaymentMethod';

const StripeIndex = () => {
  const { loading, sendRequest } = request();

  const [userBalance, setUserBalance] = useState(null);
  const [showAddCardMenu, setShowAddCardMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserBalance();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserBalance = useCallback(async () => {
    const data = await sendRequest('api/payment/userbalance');
    setUserBalance(data);
  }, [sendRequest]);

  if (!loading) {
    return (
      <Box
        p={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Divider flexItem={true}>Payment Information</Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: '300px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">Your Balance</Typography>
            <Typography variant="h4">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'USD',
              }).format(userBalance)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: '300px',
            }}
          >
            <PaymentsMethods />
          </Box>
        </Box>
        <Button
          variant="contained"
          disabled={showAddCardMenu}
          onClick={() => setShowAddCardMenu(true)}
        >
          Add new payment method
        </Button>
        {showAddCardMenu && <AddPaymentMethod />}
      </Box>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default StripeIndex;
