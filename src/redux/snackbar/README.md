## SnackBars Usage

### Add Any message

```javascript

import { useDispatch } from 'react-redux';
import { setError } from '../../redux/snackbar/snackbarSlice';

const Component = () => {

  const dispatch = useDispatch();

  const function = async () => {
    try {
    } catch (error) {
      dispatch(setError(error.message))
    }
  };
  
  return (
    <></>
  );
};

```
