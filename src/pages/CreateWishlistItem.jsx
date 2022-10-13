import React, { useState, Fragment } from 'react';
import { Typography } from '@mui/material';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import WishlistItemStepper from '../components/WishlistItemStepper';
import WishlistItemMobileStepper from '../components/WishlistItemMobileStepper';

const steps = ['Name and Goal', 'Image', 'Check and create'];

const CreateWishlistItem = () => {
  return (
    <ResponsiveContainer sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: 24, sm: 20, md: 30 },
          mb: { xs: 4 },
          textAlign: 'center',
          color: theme => theme.colors.dark,
        }}
      >
        Create a new wish
      </Typography>
      <WishlistItemStepper steps={steps} />
      <WishlistItemMobileStepper steps={steps} />
    </ResponsiveContainer>
  );
};

export default CreateWishlistItem;
