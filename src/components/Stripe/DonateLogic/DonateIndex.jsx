import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DonateForm from '../../../components/forms/Stripe/DonateForm';

const DonateIndex = () => {
  const [showDonateMenu, setShowDonateMenu] = useState(false);

  return (
    <>
      <Button
        sx={{
          width: 330,
          fontSize: 35,
          mt: 3,
          mb: 3,
          borderRadius: 3,
          backgroundColor: '#58D68D',
          boxShadow: 5,
          color: 'black',
          '&:hover': { backgroundColor: '#358255', color: 'white' },
        }}
        variant="contained"
        disabled={showDonateMenu}
        onClick={() => setShowDonateMenu(true)}
      >
        Donate
      </Button>
      {showDonateMenu && <DonateForm />}
    </>
  );
};

export default DonateIndex;
