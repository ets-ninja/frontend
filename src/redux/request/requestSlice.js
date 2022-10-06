import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = requestSlice.actions;
export default requestSlice.reducer;
