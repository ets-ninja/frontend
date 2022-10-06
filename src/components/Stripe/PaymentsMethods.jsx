import React, { useEffect, useState, useCallback } from 'react';

import Box from '@mui/system/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

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

  const loadUserPaymentMethods = useCallback(async () => {
    const data = await sendRequest('api/payment/usercards');
    setUserPaymentMethods(data);
  }, [sendRequest]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Box>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        {userPaymentMethods.length > 0 ? (
          userPaymentMethods.map(card => (
            <ListItem
              key={card.id}
              sx={{ border: '1px solid grey', borderRadius: '5px' }}
            >
              <Typography variant="h6" textTransform={'uppercase'} mr={'5px'}>
                {card.brand}
              </Typography>
              <Typography variant="h6" mr={'auto'}>
                {card.last4}
              </Typography>
              <Typography variant="h6">
                {card.exp_month}/{card.exp_year}
              </Typography>
            </ListItem>
          ))
        ) : (
          <ListItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4">You have 0 cards</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default PaymentsMethods;
