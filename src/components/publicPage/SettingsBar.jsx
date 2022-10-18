import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';

import { Box } from '@mui/system';
import { useState } from 'react';
import { Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function SettingsBar({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortAsc, setisSortAsc] = useState(false);
  const [sortBy, setSortBy] = useState({
    byDate: true,
    byTime: false,
    byValue: false,
    type: 'date',
  });

  useEffect(() => {
    setSortOrder(sortBy.type + (isSortAsc ? ' asc' : ' desc'));
  }, [isSortAsc, setSortOrder, sortBy.type]);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleOrderToggle = () => {
    setisSortAsc(!isSortAsc);
  };
  const handleSortToggle = type => {
    switch (type) {
      case 'date':
        setSortBy({
          byTime: false,
          byValue: false,
          byDate: !sortBy.byDate,
          type,
        });
        break;
      case 'time':
        setSortBy({
          byDate: false,
          byValue: false,
          byTime: !sortBy.byTime,
          type,
        });
        break;
      case 'value':
        setSortBy({
          byDate: false,
          byTime: false,
          byValue: !sortBy.byValue,
          type,
        });
        break;
      default:
        break;
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isOpen && (
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #00000040',
            borderLeft: 'none',
            borderRadius: '2px 5px 5px 2px',
            height: '54px',
            px: 1,
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              top: '0',
              left: '0',
              transform: ' translateY(-51%) scale(0.8)',
              color: '#0000009f',
              px: '8px',
              zIndex: 10,
              backgroundColor: '#fcfcfc',
            }}
          >
            Sort by
          </Typography>
          <Tooltip title="Time left" arrow>
            <TimerOutlinedIcon
              onClick={() => handleSortToggle('time')}
              sx={
                sortBy.byTime
                  ? theme => theme.icon.sortSettingsActive
                  : theme => theme.icon.sortSettings
              }
            />
          </Tooltip>
          <Tooltip title="Date created" arrow>
            <CalendarMonthIcon
              onClick={() => handleSortToggle('date')}
              sx={
                sortBy.byDate
                  ? theme => theme.icon.sortSettingsActive
                  : theme => theme.icon.sortSettings
              }
            />
          </Tooltip>
          <Tooltip title="Sum needed" arrow>
            <PaidIcon
              onClick={() => handleSortToggle('value')}
              sx={
                sortBy.byValue
                  ? theme => theme.icon.sortSettingsActive
                  : theme => theme.icon.sortSettings
              }
            />
          </Tooltip>
          <Tooltip
            title={isSortAsc ? 'Ascending Order' : 'Descending Order'}
            arrow
          >
            <FilterListIcon
              onClick={handleOrderToggle}
              sx={{
                width: '32px',
                height: '32px',
                px: '3px',
                fill: theme => theme.colors.yellow,
                transform: isSortAsc ? 'rotate(0.5turn)' : 'rotate(0)',
                transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Tooltip>
        </Box>
      )}
      <SettingsIcon
        onClick={handleToggleOpen}
        sx={{
          ml: 1,
          width: '28px',
          height: '28px',
          scale: '1',
          fill: isOpen
            ? theme => theme.colors.yellow
            : theme => theme.icon.grey.fill,
          transform: isOpen ? 'rotate(1turn)' : 'rotate(0)',
          transition: theme => theme.icon.hover.transition,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );
}
