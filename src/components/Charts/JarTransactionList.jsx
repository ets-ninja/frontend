import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useParams } from 'react-router-dom';
import { get_jar_finance_by_id } from '../../redux/basket/basketActions';

function getUserName(params) {
  return `${params.row.user.firstName} ${params.row.user.lastName}`;
}

const columns = [
  { 
    field: 'userName', 
    headerName: 'Contributor',
    width: 200,
    valueGetter: getUserName
  },
  { 
    field: 'amount', 
    headerName: 'Amount', 
    width: 150,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      return `${params.value} $`;
    }, 
  },
  { 
    field: 'comment', 
    headerName: 'Comment',
    width: 300,
  },
  { 
    field: 'createdAt', 
    headerName: 'Date',
    width: 150,
    valueFormatter: (params) => { 
      if (params.value == null) {
        return '';
      }

      return `${new Date(params.value).toLocaleDateString("en-US")}`;
    }, 
  }
]

const JarTransactionList = () => {
  const { loading } = useSelector(state => state.basket);
  const { transactions, creationDate } = useSelector(state => state.basket.basket);

  const params = useParams();
  const dispatch = useDispatch();

  const handleOnRefresh = () => {
    dispatch(get_jar_finance_by_id({ id: params.basketID }))
  }

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

        {!loading && 
          <IconButton sx={{ height: 45, width: 45 }} onClick={handleOnRefresh}>
            <RefreshIcon sx={{ fontSize: 32 }} />
          </IconButton>
          }
      </Box>
      <Box
        sx={{
          flex: 1,
          borderRadius: 4,
          boxShadow: 5,
          height: '100%',
          minHeight: '50px',
          display: 'flex',
          p: 1,
        }}
      >
        {loading &&
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress thickness={5} sx={{ height: 45, width: 45 }} />
          </Box>
        }
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
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid autoHeight rows={transactions} columns={columns} getRowId={(row) => row._id} />
          </Box>
        }
      </Box>
    </Box>
  );
};
export default JarTransactionList;
