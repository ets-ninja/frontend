import { Card, CardMedia, TextareaAutosize, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket, setBasketName, setDescription, setMoneyGoal } from '../../redux/jar/createBasketSlice'
import NumField from '../NumField';
import jarPicture1 from '../JarCard/images/JarStep1.png'

const CreationForm = () => {

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()

  return (
    <Box className="jwhenl"
      sx={{ 
        minHeight: '300px',
        display: 'flex',
        gap: '120px'
      }}
    >
      {window.innerWidth > 840 ? (
        <Card
          sx={{ml: '100px', boxShadow: 'none'}}
        >
          <CardMedia
            style={{ filter: 'grayscale(100%)' }}
            component="img"
            sx={{ width: 300, height: 420 }}
            image={jarPicture1}
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

        <NumField label={"MoneyGoal"} value={basket.moneyGoal} setValue={(e) => dispatch(setMoneyGoal(e))}/>

      </Stack>
    </Box>
  );
};

export default CreationForm;
