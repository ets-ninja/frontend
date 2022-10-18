import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { update_jar } from '../../redux/basket/basketActions';
import { useParams } from 'react-router-dom';

const getDaysBetweenDates = (date1, date2) => {
    const differenceInTime = date1 - date2;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
    return differenceInDays;
}

const JarInfo = () => {
  const { basketID } = useParams(); 
  const dispatch = useDispatch();
  const { 
      name, 
      ownerId: { firstName }, 
      description, 
      goal, 
      value, 
      expirationDate, 
      isPublic, 
      createdAt, 
      image 
  } = useSelector(state => state.basket.basket);

  const [editExpirationDateState, setEditExpirationDateState] = useState(false);

  const [editGoalState, setEditGoalState] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);

  const handleEditedGoalChange = (event) => {
    setEditedGoal(event.target.value);
  };

  useEffect(() => {
    setEditedGoal(goal);
  }, [goal])

    return (
        <Card
            fontSize="large"
            sx={{
              width: 300,
              minHeight: 450,
              borderRadius: 4,
              boxShadow: 4,
              mt: 2,
              padding: 2,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 500, fontSize: 36 }}>
              Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography variant="h3">Type: {isPublic ? 'Public' : 'Private'}</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h3">Creation date:</Typography>
                <Typography variant="h3">{createdAt ? (new Date(createdAt)).toLocaleDateString("en-US") : "00.00.00"}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Box sx={{ flexGrow: 1, display: editExpirationDateState === false ? 'inline' : 'none' }}>
                <Typography variant="h3">Expiration date:</Typography>
                <Typography variant="h3">{expirationDate ? (new Date(expirationDate)).toLocaleDateString("en-US") : "00.00.00"}</Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  minDate={dayjs(new Date()).add(1, 'day')}
                  label="Expiration Date"
                  value={expirationDate}
                  onChange={(e)=> { dispatch(update_jar({ id: basketID, expirationDate: +new Date(e) })); setEditExpirationDateState(!editExpirationDateState); } }
                  renderInput={params => <TextField sx={{ display: editExpirationDateState === true ? 'inline' : 'none' }} {...params} />}
                />
              </LocalizationProvider>
              <IconButton variant="edit" onClick={() => { setEditExpirationDateState(!editExpirationDateState) }} sx={{ height: 32, width: 32, mr: 2, mt: -0.3 }} >
                <EditIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography variant="h3">
                Time left:{' '}
                {expirationDate && getDaysBetweenDates(new Date(expirationDate), Date.now()) > 0 ? getDaysBetweenDates(new Date(expirationDate), Date.now()) + ' days' : ''}
                {expirationDate && getDaysBetweenDates(new Date(expirationDate), Date.now()) <= 0 ? 'Expired' : ''}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography variant="h3">Collected: {value}$</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography sx={{ display: editGoalState === false ? 'inline' : 'none', flexGrow: 1 }} variant="h3">Goal: {goal}$</Typography>
              <TextField
                sx={{ display: editGoalState === true ? 'inline' : 'none', flexGrow: 1, heigth: 32 }}
                id="outlined-goal"
                label="Goal"
                variant="filled"
                value={editedGoal}
                onChange={handleEditedGoalChange}
                onBlur={() => { setEditGoalState(!editGoalState); dispatch(update_jar({ id: basketID, goal: editedGoal }));} }
              />
              <IconButton
                sx={{ height: 32, width: 32, mr: 2, mt: -0.3 }}
                onClick={() => { setEditGoalState(!editGoalState) }}
              >
                <EditIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography variant="h3">Owner: {firstName || "Name"}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
              <Typography variant="h3">Participants:</Typography>
              <Button
                variant="contained"
                color="inherit"
                sx={{ height: 30, mr: 2 }}
              >
                Show
              </Button>
            </Box>
          </Card>
    )
}

export default JarInfo;