import { Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';

import request from '../../hooks/useRequest.js';
import LoadingSpinner from '../UIElements/LoadingSpinner';

const PaymentsMethods = () => {
  const { loading, sendRequest } = request();

  const [userPaymentMethods, setUserPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserPaymentMethods();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userPaymentMethods);

  const loadUserPaymentMethods = useCallback(async () => {
    const data = await sendRequest('api/payment/usercards');
    setUserPaymentMethods(data);
  }, [sendRequest]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {userPaymentMethods.length > 0 ? (
        userPaymentMethods.map(card => (
          <div key={card.id}>
            {card.brand} {card.country} {card.exp_month} {card.exp_year}
          </div>
        ))
      ) : (
        <Typography>You have 0 cards</Typography>
      )}
    </>
  );
};

export default PaymentsMethods;
