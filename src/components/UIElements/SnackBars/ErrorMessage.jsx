import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { clearError } from '../../../redux/snackbar/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = () => {
  const user = useSelector(state => state.user);
  const creationBasket = useSelector(state => state.creationBasket);
  const snackbar = useSelector(state => state.snackbar);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
    value: '',
  });

  useEffect(() => {
    if (snackbar.error) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: snackbar.error,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [snackbar.error]);

  useEffect(() => {
    if (user.error) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: user.error,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [user.error]);

  useEffect(() => {
    if (auth.error) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: auth.error,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [auth.error]);

  useEffect(() => {
    if (creationBasket.errorInfo) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: creationBasket.errorInfo,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [creationBasket.errorInfo]);

  const handleClose = () => {
    setState({ ...state, open: false, value: '' });
    if (snackbar.error) {
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
        autoHideDuration={3000}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          {state.value}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorMessage;
