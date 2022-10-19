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
import Button from '@mui/material/Button';

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
  const [labels, setLabels] = useState([]);
  const [isMonth, setIsMonth] = useState(true);

  useEffect(() => {
    if (isMonth) {
      labelsMonths();
    } else {
      labelsDays();
    }
  }, [isMonth]);

  const labelsMonths = () => {
    setLabels(() => {
      let labels = [],
        today = new Date(),
        day,
        month;
      for (var i = 6; i > 0; i -= 1) {
        day = new Date(today.getFullYear(), today.getMonth() - i, 1);
        month = MONTH_NAMES[day.getMonth()];
        labels.push(month);
      }
      return labels;
    });
  };

  const labelsDays = () => {
    setLabels(() => {
      let labels = [];
      for (let index = 0; index < 14; index++) {
        var ourDate = new Date();
        var pastDate = ourDate.getDate() - index;
        ourDate.setDate(pastDate);
        labels.push(ourDate.toDateString());
      }
      return labels;
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Transactions',
        data: labels.map(() => getRandomInt(1000)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

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
        <Button
          variant={isMonth ? 'contained' : 'outlined'}
          onClick={() => setIsMonth(true)}
        >
          Last 6 month
        </Button>
        <Button
          variant={!isMonth ? 'contained' : 'outlined'}
          onClick={() => setIsMonth(false)}
        >
          Last 14 days
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          borderRadius: 4,
          boxShadow: 5,
          p: 1,
        }}
      >
        <Line options={OPTIONS} data={data} />
      </Box>
    </Box>
  );
};

export default BasketChart;
