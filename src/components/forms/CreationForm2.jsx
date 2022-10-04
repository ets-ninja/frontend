import { Card, CardMedia, Switch, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket, setDaysCount, setIsPublic} from '../../redux/basket/createBasketSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const CreationForm2 = ({setIsChecked1, isChecked1}) => {
  // todo redux problem (with hook all right) 
  const [test, setTest] = useState()

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()

  const switchHandler = (e) => {
    setIsChecked1(e)
    if(basket.daysCount) {
      dispatch(setDaysCount(''))
    }
  }

  return (
    <Box
      className="jwhenl"
      sx={{
        minHeight: '300px',
        display: 'flex',
        gap: '120px',
      }}
    >
      {window.innerWidth > 840 ? (
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
            onChange={e => switchHandler(e.target.checked)}
          />
        </Box>

        {isChecked1 ? (
          // <Box sx = {{pl: '50px'}}>
          //   <TextField
          //     sx={{ maxWidth: '100px'}}
          //     type="number"
          //     value={basket.daysCount}
          //     onChange={(e)=> dispatch(setDaysCount(e.target.value)) }
          //     label="Days count"
          //     // id="outlined-number"
          //     InputLabelProps={{
          //       shrink: true,
          //     }}
          //   />
          // </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expired Date"
              value={basket.daysCount}
              onChange={(e)=> dispatch(setDaysCount(e)) }
              // value={test}
              // onChange={e => setTest(e) }
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : (
          <> </>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Public?</Typography>
          <Switch
            checked={basket.isPublic}
            onChange={e => dispatch(setIsPublic(e.target.checked))}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default CreationForm2