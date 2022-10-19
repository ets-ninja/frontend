import React,  { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { changePage } from '../../redux/basket/basketSlice'
import JarCard from '../JarCard';
import { CardSkeleton } from '../publicPage';

const JarDashboard = () => {
  const { baskets, paginationData, loading, error, success } = useSelector(state => state.basket);
  const { maxPageAmount } = useSelector(state => state.basket.paginationData);
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    dispatch(changePage({ value }));
  }

  return (
    <>
      {error && 
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 6,
        }}>
          <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 20 }}>There is an error with loading: {error}</Typography> 
        </Box>
      }
      {loading && <CardSkeleton quantity={3} />}
      {!loading && baskets?.length === 0 &&
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 6,
          }}>
          <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 50 }}>No jars found</Typography> 
        </Box> 
        }
      {!loading && !!baskets?.length && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: { smd: '-15px', md: '-20px', xl: '-30px' },
            mt: 1,
          }}
        >
          {baskets.map(jar => (
            <JarCard
              key={jar._id}
              bank={jar}
              isMyJar={true}
            />
          ))}
        </Box>
      )}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
        }}> 
        { !loading && !!baskets?.length && <Pagination count={paginationData.maxPageAmount} page={paginationData.page} onChange={handlePageChange} color="primary"/>}
      </Box> 
    </>
  );
};

export default JarDashboard;
