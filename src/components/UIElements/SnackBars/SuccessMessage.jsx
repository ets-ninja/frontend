import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { clearSuccess } from '../../../redux/snackbar/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessMessage = () => {
  const user = useSelector(state => state.user);
  const creationBasket = useSelector(state => state.creationBasket);
  const wishlist = useSelector(state => state.wishlist);
  const snackbar = useSelector(state => state.snackbar);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
    value: '',
  });

  useEffect(() => {
    if (snackbar.success) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: snackbar.success,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [user.successInfo, snackbar.success]);

  useEffect(() => {
    if (user.successInfo.message) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: user.successInfo?.message,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [user.successInfo, snackbar.success]);

  useEffect(() => {
    if (creationBasket.successInfo) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: creationBasket.successInfo,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [creationBasket.successInfo, snackbar.success]);

  useEffect(() => {
    if (wishlist.successInfo) {
      setState(prevValue => ({
        ...prevValue,
        open: true,
        value: wishlist.successInfo,
      }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false, value: '' }));
    }
  }, [wishlist.successInfo]);

  const handleClose = () => {
    setState({ ...state, open: false });

    if (snackbar.success) {
      dispatch(clearSuccess());
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
        <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
          {state.value}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessMessage;
