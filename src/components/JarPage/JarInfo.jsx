import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import { update_jar } from '../../redux/jar/basketActions';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const getDaysBetweenDates = (date1, date2) => {
  const differenceInTime = date1 - date2;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

const JarInfo = () => {
  const { basketID } = useParams();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.basket);
  const {
    ownerId: { firstName },
    goal = 0,
    value = 0,
    expirationDate,
    isPublic = false,
    creationDate,
  } = useSelector(state => state.basket.basket);

  const [editExpirationDateState, setEditExpirationDateState] = useState(false);

  const [editGoalState, setEditGoalState] = useState(false);
  const [editedGoal, setEditedGoal] = useState(0);

  const handleEditedGoalChange = event => {
    setEditedGoal(event.target.value);
  };

  useEffect(() => {
    setEditedGoal(goal);
  }, [goal]);

  const handleOnSave = () => {
    if (editedGoal > 0) {
      setEditGoalState(!editGoalState);

      if (editedGoal !== goal) {
        dispatch(update_jar({ id: basketID, goal: editedGoal }));
      }
    }
  };

  return (
    <Card
      fontSize="large"
      sx={{
        width: '100%',
        minHeight: 450,
        borderRadius: 4,
        boxShadow: 4,
        mt: 2,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 500, fontSize: 36 }}>
          Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography variant="h3">
            Type: {isPublic ? 'Public' : 'Private'}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3">Creation date:</Typography>
            <Typography variant="h3">
              {creationDate
                ? new Date(creationDate).toLocaleDateString('en-US')
                : '00.00.00'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: editExpirationDateState === false ? 'inline' : 'none',
            }}
          >
            <Typography variant="h3">Expiration date:</Typography>
            <Typography variant="h3">
              {expirationDate
                ? new Date(expirationDate).toLocaleDateString('en-US')
                : '00.00.00'}
            </Typography>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={dayjs(new Date()).add(1, 'day')}
              label="Expiration Date"
              value={expirationDate}
              onChange={e => {
                dispatch(
                  update_jar({ id: basketID, expirationDate: +new Date(e) }),
                );
                setEditExpirationDateState(!editExpirationDateState);
              }}
              renderInput={params => (
                <TextField
                  sx={{
                    display:
                      editExpirationDateState === true ? 'inline' : 'none',
                    pr: 2,
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <IconButton
            variant="edit"
            onClick={() => {
              if (!loading) {
                setEditExpirationDateState(!editExpirationDateState);
              }
            }}
            sx={{
              height: 44,
              width: 44,
              transition: '0.5s',
              '&:hover': {
                background: '#FBB13C',
                color: 'black',
              },
            }}
          >
            <EditIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography variant="h3">
            Time left:{' '}
            {expirationDate &&
            getDaysBetweenDates(new Date(expirationDate), Date.now()) > 0
              ? getDaysBetweenDates(new Date(expirationDate), Date.now()) +
                ' days'
              : ''}
            {expirationDate &&
            getDaysBetweenDates(new Date(expirationDate), Date.now()) <= 0
              ? 'Expired'
              : ''}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography variant="h3">Collected: {value}$</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography
            sx={{
              display: editGoalState === false ? 'inline' : 'none',
              flexGrow: 1,
            }}
            variant="h3"
          >
            Goal: {goal}$
          </Typography>
          <TextField
            sx={{
              display: editGoalState === true ? 'inline' : 'none',
              flexGrow: 1,
              pr: 2,
            }}
            inputProps={{ style: { height: 16 } }}
            error={editedGoal <= 0}
            id="outlined-goal"
            helperText="Goal cannot be negative"
            label="Goal"
            value={editedGoal}
            onChange={handleEditedGoalChange}
            onBlur={handleOnSave}
          />
          <IconButton
            sx={{
              height: 44,
              width: 44,
              mt: -1.5,
              display: editGoalState === false ? 'inline' : 'none',
              transition: '0.5s',
              '&:hover': {
                background: '#FBB13C',
                color: 'black',
              },
            }}
            onClick={() => {
              if (!loading) {
                setEditGoalState(!editGoalState);
              }
            }}
          >
            <EditIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            sx={{
              height: 44,
              width: 44,
              mt: -1.5,
              display: editGoalState === true ? 'inline' : 'none',
              transition: '0.5s',
              '&:hover': {
                background: '#FBB13C',
                color: 'black',
              },
            }}
            onClick={handleOnSave}
          >
            <SaveIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography variant="h3">Owner: {firstName || 'Name'}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
          <Typography variant="h3">Participants:</Typography>
          <Button variant="contained" color="inherit" sx={{ height: 30 }}>
            Show
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default JarInfo;
