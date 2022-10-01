import { Card, CardMedia, Switch, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreationForm2 = ({setIsChecked1, isChecked1, isChecked2, setIsChecked2 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '120px',
      }}
    >
      {window.innerWidth > 900 ? (
        <Card sx={{ ml: '100px' }}>
          <CardMedia
            style={{ filter: 'grayscale(50%)' }}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Is time limited?</Typography>
          <Switch
            checked={isChecked1}
            onChange={e => setIsChecked1(e.target.checked)}
          />
        </Box>
        {isChecked1 ? (
          <Box sx = {{pl: '50px'}}>
            <TextField
              sx={{ maxWidth: '100px'}}
              type="number"
              label="Days count"
              // id="outlined-number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        ) : (<> </>)}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Public?</Typography>
          <Switch
            checked={isChecked2}
            onChange={e => setIsChecked2(e.target.checked)}
          />
        </Box>

      </Stack>
    </Box>
  );
}

export default CreationForm2