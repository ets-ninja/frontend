import { Card, CardMedia, TextareaAutosize, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket, setBasketName, setDescription, setMoneyGoal } from '../../redux/basket/basketSlice'


const CreationForm = ({setTestAmount, testAmount}) => {

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()
  // const {
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  return (
    <Box className="jwhenl"
      sx={{ 
        display: 'flex',
        gap: '120px'
      }}
    >
      {window.innerWidth > 840 ? (
        <Card
          sx={{ml: '100px'}}
        >
          <CardMedia
            style={{ filter: 'grayscale(100%)' }}
            component="img"
            sx={{ width: 300, height: 420 }}
            image="https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"
            alt="Live from space album cover"
          />
        </Card>
      ) : (
        <> </>
      )}

      <Stack spacing={3} sx={{display: 'flex'}}>

        <TextField type="text" label="BasketName" value={basket.basketName} onChange={(e)=> dispatch(setBasketName(e.target.value))}/>

        <TextareaAutosize value={basket.description} onChange={(e)=> dispatch(setDescription(e.target.value))}
        style={{resize: 'none'}} type="text" placeholder="Description" minRows={3} maxRows={7} />

        <TextField  type='number' value={basket.moneyGoal} onChange={(e)=> dispatch(setMoneyGoal(e.target.value))}
        inputProps={{ inputMode: 'numeric', pattern: '/[^0-9]/g' }}
          label="Amount of Money" />

      </Stack>
    </Box>
  );
};

export default CreationForm;
