import React from 'react';
import BasketBox from './BasketBox';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import LoadingSpinner from './LoadingSpinner';
import { changePage } from '../../redux/basket/basketSlice'

const BasketDashboard = () => {
  const { baskets, paginationData, loading, error, success } = useSelector(state => state.basket);
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    dispatch(changePage({ value }));
  }

  return (
    <Box sx={{ bgcolor: 'white', boxShadow: 1, borderRadius: 3, p: 2, color: 'black', borderColor: "black", position: 'relative' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, minWidth: 300, minHeight: 500, justifyContent: 'center', alignItems: 'center' }}>
        { error && <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 20, flexGrow: 1 }}>There is an error with loading: {error}</Typography> }
        { !error && loading && <LoadingSpinner /> }
        { !error && !loading && baskets.map((basket) => { return(<BasketBox data={basket} key={basket.id} />) }) }
        { !error && !loading && baskets.length === 0 && <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 30, flexGrow: 1 }}> No baskets available! </Typography> }
      </Box>
      { !loading && <Pagination count={paginationData.maxPageAmount} page={paginationData.page} onChange={handlePageChange} color="primary" sx={{ position: 'absolute', bottom: 10, right: 1 }}/>}
    </Box>
  );
};

export default BasketDashboard;
