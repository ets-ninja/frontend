import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'Transaction id', width: 150 }
]

const JarTransactionList = () => {
  const { loading } = useSelector(state => state.basket);
  const { transactions } = useSelector(state => state.basket.basket);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingY: 1,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginY: 0.5,
          gap: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            fontSize: 36,
            pb: 0.5,
            maxHeight: 'min-content',
          }}
        >
          Transaction list
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          borderRadius: 4,
          boxShadow: 5,
          p: 1,
        }}
      >
        
        {!loading && transactions?.length === 0 &&
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 6,
            mb: 6
          }}>
          <Typography variant='h2' sx={{ fontFamily: 'Ubuntu', fontWeight: 500, fontSize: 50 }}>No transactions found</Typography> 
        </Box> 
        }
        {!loading && transactions?.length > 0 &&
          <DataGrid rows={transactions} columns={columns} />
        }
      </Box>
    </Box>
  );
};
export default JarTransactionList;
