import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import request from '../../../hooks/useRequest';

import Button from '@mui/material/Button';
import LoadingSpinner from '../../UIElements/LoadingSpinner';

const WithdrawalIndex = () => {
  const { loading, sendRequest } = request();
  let { basketID } = useParams();
  const navigate = useNavigate();

  async function handleReceive() {
    let withdrawStatus;
    try {
      withdrawStatus = await sendRequest('api/payment/recieve_money', 'POST', {
        basketId: basketID,
      });
    } catch (err) {
      return;
    }

    if (withdrawStatus === 'succeeded') {
      navigate(`/receive-status`);
    }
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Button
        sx={{
          width: '100%',
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
