import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { Link } from '@mui/material';

import LoadingSpinner from '../../UIElements/LoadingSpinner';

import request from '../../../hooks/useRequest';

const ConnectedAccountIndex = () => {
  const [accountLink, setAccountLink] = useState(null);
  const { loading, sendRequest } = request();

  async function getLink() {
    const accountLink = await sendRequest(
      'api/payment/create_conn_account',
      'POST',
    );
    setAccountLink(accountLink);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Button variant="outlined" onClick={getLink}>
        Add Verified Account
      </Button>
      {accountLink && (<Link href={accountLink}>Please click to complete verififcation</Link>
      )}
    </>
  );
};

export default ConnectedAccountIndex;
