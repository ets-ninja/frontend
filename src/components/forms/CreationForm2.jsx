import { Card, CardMedia, Switch, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasket, setExpirationDate, setIsPublic} from '../../redux/jar/createBasketSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import jarPicture4 from '../JarCard/images/JarStep4.png'

const CreationForm2 = ({setIsChecked1, isChecked1, isChecked3, setIsChecked3}) => {

  const basket = useSelector(selectBasket);
  const dispatch = useDispatch()

  const switchHandler = (e) => {
    setIsChecked1(e)
    if(basket.expirationDate) {
      dispatch(setExpirationDate(null))
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
        <Card sx={{ ml: '100px', boxShadow: 'none' }}>
          <CardMedia
            style={{ filter: 'grayscale(50%)' }}
            component="img"
            sx={{ width: 300, height: 420 }}
            image={jarPicture4}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={dayjs(new Date()).add(1, 'day')}
              label="Expired Date"
              value={basket.expirationDate}
              onChange={(e)=> dispatch(setExpirationDate(+new Date(e))) }
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
        <Box
          className="jwhenl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Typography>Solo/Team</Typography>
          <Switch
            checked={isChecked3}
            onChange={e => setIsChecked3(e.target.checked)}
          />
        </Box>
        {isChecked3 ? (
          <Box sx={{ pl: '50px' }}>
            <TextField
              sx={{ maxWidth: '100px' }}
              type="number"
              label="User Id"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        ) : (
          <> </>
        )}
      </Stack>
    </Box>
  );
}

export default CreationForm2