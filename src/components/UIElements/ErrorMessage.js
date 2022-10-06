import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { clearError } from '../../redux/request/requestSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = () => {
  const user = useSelector(state => state.user);
  const request = useSelector(state => state.request);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    if (user.error || request.error) {
      setState(prevValue => ({ ...prevValue, open: true }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false }));
    }
  }, [user.error, request.error]);

  const handleClose = () => {
    setState({ ...state, open: false });
    if (request.error) {
      dispatch(clearError());
    }
  };

  return (
    <>
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
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          {user.error ? user.error : request.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorMessage;
