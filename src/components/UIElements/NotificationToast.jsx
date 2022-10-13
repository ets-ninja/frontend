import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
          autoHideDuration={5000}
          TransitionComponent={state.Transition}
          key={state.Transition.name}
          onClose={handleClose}
        >
          <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>
            <AlertTitle>You have new Notification</AlertTitle>
            New donate from
            <strong>{newNotification.notification.title}</strong>
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationToast;
