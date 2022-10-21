import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ResponsiveContainer from '../components/styled/ResponsiveContainer'
import Button from '@mui/material/Button';
import BasketChart from '../components/Charts/BasketChart';
import JarTransactionList from '../components/Charts/JarTransactionList';
import { useDispatch } from 'react-redux';
import { get_basket_by_id } from '../redux/basket/basketActions';
import { useParams } from 'react-router-dom';
import JarInfo from '../components/JarPage/JarInfo';
import JarInfoHeader from '../components/JarPage/JarInfoHeader';
import JarDescription from '../components/JarPage/JarDescription';
import JarProgress from '../components/JarPage/JarProgress';
import DonateIndex from '../components/Stripe/DonateLogic/DonateIndex';
import ReceiveIndex from '../components/Stripe/ReceiveLogic/ReceiveIndex';

const JarPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_basket_by_id({ id: params.basketID }))
  }, [])

  return (
    <ResponsiveContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
      }}
    >
      <Box 
        sx={{
        display: 'flex',
        width: '100%',
        mb: 2,
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        flexWrap: 'nowrap',
        alignItems: { xs: 'center', sm: 'center', md: 'start' }
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: { lg: '360px' } }}>
          <JarInfoHeader />
          <JarInfo />
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}> 
            <DonateIndex />
            <ReceiveIndex />
        </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            ml: { xs: 0, sm: 0, md: 4 },
            width: '100%',
            maxWidth: 1350,
            flexWrap: 'wrap',
          }}
        >
          <JarProgress />
          <JarDescription />
        </Box>
      </Box>
      <JarTransactionList sx={{ width: "100%" }} />
      <BasketChart sx={{ width: "100%" }} />
    </ResponsiveContainer>
  );
};

export default JarPage;