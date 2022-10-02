import React, { useEffect, useState, useCallback } from 'react';

import request from '../../hooks/useRequest';

import Divider from '@mui/material/Divider';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { Button, Typography } from '@mui/material';
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
    const data = await sendRequest('api/payment/userbalance', 'POST');
    setUserBalance(data);
  }, [sendRequest]);

  if (!loading) {
    return (
      <>
        <Divider>Payment Information</Divider>
        <Typography>
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'USD',
          }).format(userBalance)}
        </Typography>
        <PaymentsMethods />
        <Button variant="contained" onClick={() => setShowAddCardMenu(true)}>
          Add new payment method
        </Button>
        {showAddCardMenu && <AddPaymentMethod />}
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default StripeIndex;
