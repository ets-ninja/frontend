import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ResponsiveContainer from '../components/styled/ResponsiveContainer'
import Button from '@mui/material/Button';
import BasketChart from '../components/Charts/BasketChart';
import { useDispatch } from 'react-redux';
import { get_basket_by_id } from '../redux/basket/basketActions';
import { useParams } from 'react-router-dom';
import JarInfo from '../components/JarPage/JarInfo'
import JarInfoHeader from '../components/JarPage/JarInfoHeader'
import JarDescription from '../components/JarPage/JarDescription'
import JarProgress from '../components/JarPage/JarProgress'

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
        flexDirection: 'row',
        flexWrap: 'nowrap'
        }}>
        <Box>
          <JarInfoHeader />
          <JarInfo />
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
            width: 'auto',
            maxWidth: 1350,
            flexWrap: 'wrap',
          }}
        >
          <JarProgress />
          <JarDescription />
        </Box>
      </Box>
      <BasketChart />
    </ResponsiveContainer>
  );
};

export default JarPage;