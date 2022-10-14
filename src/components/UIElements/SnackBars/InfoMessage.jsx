import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoMessage = () => {
  const user = useSelector(state => state.user);
  //const dispatch = useDispatch();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    if (false) {
    } else {
      setState(prevValue => ({ ...prevValue, open: false }));
    }
    // if (user.info) {
    // } else {
    //   setState(prevValue => ({ ...prevValue, open: false }));
    // }
  }, [user]);

  const handleClose = () => {
    setState({ ...state, open: false });
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
          {user.succsessInfo?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InfoMessage;
