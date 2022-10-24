import { Card, CardMedia, Switch, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket, setPhotoTag } from '../../redux/jar/createBasketSlice';
import defaultImage from '../../assets/swinka.png';
import useModal from '../../hooks/useModal';
import jarPicture5 from '../JarCard/images/JarStep5.png';

const CreationForm3 = () => {
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const modal = useModal();

  const handleModalPhoto = () => {
    modal.open('update-photo', {
      width: 250,
      height: 141,
      aspect: 16 / 9,
      canvasBorderRadius: 0,
      path: 'changeBasketTag',
    });
  };

  return (
    <Box
      className="jwhenl"
      sx={{
        minHeight: '270px',
        display: 'flex',
        gap: '120px',
      }}
    >
      {window.innerWidth > 840 ? (
        <Card sx={{ ml: '100px', boxShadow: 'none' }}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 420 }}
            image={jarPicture5}
            alt="Live from space album cover"
          />
        </Card>
      ) : (
        <> </>
      )}

      <Stack spacing={3} sx={{ display: 'flex' }}>
        <Box sx={{ position: 'relative' }}>
          <Typography sx={{ mb: '30px' }}>Banka tag:</Typography>
          <img
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              right: '-10px',
              top: '45px',
              cursor: 'pointer',
              backgroundColor: 'white',
            }}
            onClick={handleModalPhoto}
            src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
            alt=""
            srcSet=""
          />
          <CardMedia
            component="img"
            sx={{
              width: 250,
              height: 141,
              ml: '30px',
              objectFit: 'contain',
              border: 'solid 1px black',
            }}
            image={basket.photoTag ? basket.photoTag : defaultImage}
            alt="Live from space album cover"
          />
          <Typography>or</Typography>
          <TextField
            type="text"
            label="Image URL (16/9)"
            sx={{ ml: '30px', width: '252px', mb: '23px' }}
            value={basket.photoTag}
            onChange={e => dispatch(setPhotoTag(e.target.value))}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CreationForm3;
