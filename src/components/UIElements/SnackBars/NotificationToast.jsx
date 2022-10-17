import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NotificationToast = () => {
  const { newNotification } = useSelector(state => state.notification);

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    setState(prevValue => ({ ...prevValue, open: true }));
  }, [newNotification]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      {newNotification && (
        <Snackbar
          anchorOrigin={{
            vertical: state.vertical,
            horizontal: state.horizontal,
          }}
          open={state.open}
          autoHideDuration={3000}
          TransitionComponent={state.Transition}
          key={state.Transition.name}
          onClose={handleClose}
        >
          <Box
            onClose={handleClose}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: '5px',
              padding: '20px',
              boxShadow:
                'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
            }}
          >
            <Box
              component="img"
              alt="Notification image"
              src={newNotification.notification.image}
              sx={{
                height: 50,
                width: 50,
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography variant="h6">{`New donate from ${newNotification.notification.title}`}</Typography>
              <Typography variant="p">
                {newNotification.notification.body}
              </Typography>
            </Box>
          </Box>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationToast;
