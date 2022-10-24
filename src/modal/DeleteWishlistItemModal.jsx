import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import { setItemToDelete } from '@redux/wishlist/wishlistSlice';
import useModal from '@hooks/useModal';

const DeleteWishlistItemModal = () => {
  const { data } = useSelector(state => state.modal);

  const modal = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setItemToDelete({ id: data.deleteWishlistItemId, from: 'modal' }));
    modal.close();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: { xs: '100%', sm: '500px' },
          py: 2,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            lineHeight: 1.2,
            my: 1.5,
            color: theme => theme.colors.dark,
          }}
        >
          Are you sure you want to remove it?
        </Typography>
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{
            color: theme => theme.colors.white,
            py: 1.5,
            my: 1,
            letterSpacing: 1,
            background: theme => theme.palette.danger.main,
            '&:hover': {
              background: theme => theme.palette.danger.dark,
            },
          }}
        >
          Yes, please!
        </Button>
      </Box>
    </>
  );
};

export default DeleteWishlistItemModal;
