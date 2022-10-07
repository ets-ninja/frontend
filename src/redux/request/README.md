# AXIOS

## Simple request

```javascript

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { request } from '../../redux/request/requestAction';

import Button from '@mui/material/Button';

const yourComponent = () => {

  const { success, error, loading, data } = useSelector(state => state.request);
  const dispatch = useDispatch();
  
  const { handleSubmit } = useForm();
  
  const submitForm = data => {
    dispatch(request({ method: 'GET', url: 'api/your_path', body: data }));
  };
  
  return (
      <form onSubmit={handleSubmit(submitForm)}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
  );
};

```

###### User token attached in every request if exist
