import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { clearInfo } from '../../../redux/snackbar/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoMessage = () => {
  const snackbar = useSelector(state => state.snackbar);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    if (snackbar.info) {
      setState(prevValue => ({ ...prevValue, open: true }));
    }
    if (!snackbar.info) {
      setState(prevValue => ({ ...prevValue, open: false }));
    }
  }, [snackbar]);

  const handleClose = () => {
    setState({ ...state, open: false });
    if (snackbar.info) {
      dispatch(clearInfo());
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
        <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>
          {snackbar.info}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InfoMessage;
