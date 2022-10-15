import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreatePayment from './CreatePayment';

const DonateIndex = () => {

  const [showDonateMenu, setShowDonateMenu] = useState(false);

  return (
    <Box
      p={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Button
        variant="contained"
        disabled={showDonateMenu}
        onClick={() => setShowDonateMenu(true)}
      >
        Donate
      </Button>
      {showDonateMenu && <CreatePayment />}
    </Box>
  );
};

export default DonateIndex;
