import { createSlice } from '@reduxjs/toolkit';
import { request } from './requestAction';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
  extraReducers: {
    [request.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [request.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    },
    [request.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default requestSlice.reducer;
