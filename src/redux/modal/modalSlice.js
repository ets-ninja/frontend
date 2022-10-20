import { createSlice } from '@reduxjs/toolkit';
import { fetchModalJar } from './modalActions';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { data: null, isLoading: false, error: null, isOpen: false },
  reducers: {
    setModalData: (state, { payload }) => ({
      ...state,
      ...payload,
      isOpen: true,
    }),
    closeModal: state => ({
      ...state,
      isOpen: false,
    }),
  },
  extraReducers: {
    [fetchModalJar.pending]: state => {
      state.data = null;
      state.isLoading = true;
      state.error = null;
    },
    [fetchModalJar.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [fetchModalJar.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default modalSlice;
