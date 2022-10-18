import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  success: null,
  info: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearError: state => {
      state.error = null;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    clearSuccess: state => {
      state.success = null;
    },
    setInfo: (state, { payload }) => {
      state.info = payload;
    },
    clearInfo: state => {
      state.info = null;
    },
  },
});

export const {
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  setInfo,
  clearInfo,
} = snackbarSlice.actions;
export default snackbarSlice.reducer;
