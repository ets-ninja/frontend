import { Card, CardMedia, Switch, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket} from '../../redux/basket/basketSlice'

const CreationForm3 = ({isChecked3, setIsChecked3}) => {

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '120px',
      }}
    >
      {window.innerWidth > 840 ? (
        <Card sx={{ ml: '100px' }}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 420 }}
            image="https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"
            alt="Live from space album cover"
          />
        </Card>
      ) : (
        <> </>
      )}

      <Stack spacing={3} sx={{ display: 'flex' }}>
        <Box className="jwhenl"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Solo/Team</Typography>
          <Switch
            checked={isChecked3}
            onChange={e => setIsChecked3(e.target.checked)}
          />
        </Box>
        {isChecked3 ? (
          <Box sx = {{pl: '50px'}}>
            <TextField
              sx={{ maxWidth: '100px'}}
              type="number"
              label="User Id"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        ) : (<> </>)}
        <Box sx={{position: 'relative'}}
        >
          <Typography
            sx={{mb: '30px'}}
          >
            Banka tag:
          </Typography>
          <img style={{position: 'absolute', width: '20px', height: '20px', right: '-10px', top: '45px', cursor: 'pointer', backgroundColor: "white" }}
          src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" srcSet="" />
          <CardMedia 
            component="img"
            sx={{ width: 200, height: 180, ml:'30px', border: 'solid 1px black'  }}
            image="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/7812792/pig-clipart-sm.png"
            alt="Live from space album cover"
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default CreationForm3