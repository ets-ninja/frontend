import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_jar_finance_by_id } from '../../redux/basket/basketActions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

var MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const BasketChart = () => {
  const { loading } = useSelector(state => state.basket);
  const { transactions, creationDate } = useSelector(state => state.basket.basket);
  const params = useParams();
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setLabels(getlabels);
  }, [transactions])

  const getlabels = () => {
    let oneMonthDateAhead = new Date();
    oneMonthDateAhead = new Date(oneMonthDateAhead.setMonth(oneMonthDateAhead.getMonth()+2));

    const monthDifference = Math.max(Math.floor(
      new Date(oneMonthDateAhead - new Date(creationDate)) /
        (2629746000),
    ), 2)
      
    let labels = [],
      day,
      month,
      year;
    for (var i = monthDifference; i > 0; i -= 1) {
      day = new Date(oneMonthDateAhead.getFullYear(), oneMonthDateAhead.getMonth() - i, 1);
      month = MONTH_NAMES[day.getMonth()];
      year = day.getFullYear();
      labels.push(`${month} ${year}`);
    }
    return labels;
  };

  const getSumForDate = (label) => {
    let sum = 0;

    for(let i = 0; i < transactions.length; i++){
      let date = new Date(transactions[i].createdAt);
      const month = MONTH_NAMES[date.getMonth()];
      const year = date.getFullYear();

      if(`${month} ${year}` === label){
        sum += transactions[i].amount;
      }
    }

    return sum;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Transactions',
        data: labels.map((label) => getSumForDate(label)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

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
          Transaction history
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
          p: 1,
        }}
      >
        {!loading && <Line options={OPTIONS} data={data} />}
        {loading &&
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress thickness={5} sx={{ height: 45, width: 45 }} />
          </Box>
        }
      </Box>
    </Box>
  );
};

export default BasketChart;
