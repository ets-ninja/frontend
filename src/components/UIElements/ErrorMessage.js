import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = () => {
  const { error } = useSelector(state => state.user);
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    if (error) {
      setState(prevValue => ({ ...prevValue, open: true }));
    } else {
      setState(prevValue => ({ ...prevValue, open: false }));
    }
  }, [error]);

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
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};

export default ErrorMessage;
