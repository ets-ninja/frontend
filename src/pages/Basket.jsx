import React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import BasketChart from '../components/Charts/BasketChart';
import { useDispatch, useSelector } from 'react-redux';
import { get_basket_by_id } from '../redux/basket/basketActions';
import { useParams } from 'react-router-dom';
import { borderRadius } from '@mui/system';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    background:
      'linear-gradient(270.27deg, #58D68D 1.94%, rgba(88, 214, 141, 0.51) 99.95%);',
  },
}));

const getDaysBetweenDates = (date1, date2) => {
  const differenceInTime = date1 - date2;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

const Basket = () => {
  const params = useParams();
  
  const { name, ownerId: { firstName }, description, goal, value, expirationDate, isPublic, createdAt, image } = useSelector(state => state.basket.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_basket_by_id({ id: params.basketID }))
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 3,
        pl: 1,
        pr: 1,
      }}
    >
      <IconButton sx={{ height: 35, width: 35, mt: 1 }} component={Link} to="/">
        <ChevronLeftIcon fontSize="large" />
      </IconButton>
      <Box sx={{ ml: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant="h1"
            sx={{ fontFamily: 'Ubuntu', fontWeight: 700, fontSize: 40 }}
          >
            {name}
          </Typography>
          <IconButton sx={{ height: 45, width: 45, ml: 3 }} component={Link}>
            <EditIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
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
            <IconButton sx={{ height: 32, width: 32, mr: 2 }} component={Link}>
              <EditIcon sx={{ fontSize: 25 }} />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3">Creation date:</Typography>
              <Typography variant="h3">{createdAt ? (new Date(createdAt)).toLocaleDateString("en-US") : "00.00.00"}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3">Expiration date:</Typography>
              <Typography variant="h3">{expirationDate ? (new Date(expirationDate)).toLocaleDateString("en-US") : "00.00.00"}</Typography>
            </Box>
            <IconButton variant="edit" component={Link} sx={{ height: 32, width: 32, mr: 2, mt: -0.3 }} >
              <EditIcon sx={{ fontSize: 25 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Typography variant="h3">
              Time left:{' '}
              {expirationDate && getDaysBetweenDates(Date.parse(expirationDate), Date.now()) > 0 ? getDaysBetweenDates(Date.parse(expirationDate), Date.now()) + ' days' : ''}
              {expirationDate && getDaysBetweenDates(Date.parse(expirationDate), Date.now()) <= 0 ? 'Expired' : ''}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Typography variant="h3">Collected: {value}$</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Typography variant="h3">Goal: {goal}$</Typography>
            <IconButton
              sx={{ height: 32, width: 32, mr: 2, mt: -0.3 }}
              component={Link}
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
        <Button
          sx={{
            width: 330,
            fontSize: 35,
            mt: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: '#58D68D',
            boxShadow: 5,
            color: 'black',
            '&:hover': { backgroundColor: '#358255', color: 'white' },
          }}
        >
          Donate
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          ml: 4,
          mr: 10,
          mt: 0.5,
          maxWidth: 1350,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ width: '95%', position: 'relative' }}>
          <BorderLinearProgress
            variant="determinate"
            value={value * 100 / goal}
            sx={{
              height: '45px',
              mt: 2,
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            component="p"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            {value}$
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '103%',
              transform: 'translate(-50%, -50%)',
            }}>
            {goal}$
          </Typography>
        </Box>
        <Card
          fontSize="large"
          sx={{
            width: '100%',
            borderRadius: 4,
            boxShadow: 4,
            mt: 2,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Box sx={{ flexGrow: 1, m: 2 }}>

          	
          	<Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
            	<Typography variant="h3">Description</Typography>
            	<IconButton
              	sx={{ height: 32, width: 32, mr: 2, mt: -0.3 }}
              	component={Link}
            	>
              	<EditIcon sx={{ fontSize: 25 }} />
            	</IconButton>
          	</Box>
            <Typography variant="h3">{description}</Typography>
          </Box>

          <Box component="img" src={image || "https://img.freepik.com/free-photo/wicker-basket-isolated_2829-18051.jpg?w=360"} 
          sx={{ 
            minWidth: 200, 
            minHeight: 200, 
            backgroundColor: 'red',
            borderRadius: '0px 23px 23px 0px',
            alignItems: 'right' 
            }}> 
		
          </Box>
        </Card>
        <BasketChart />
      </Box>
    </Box>
  );
};

export default Basket;

