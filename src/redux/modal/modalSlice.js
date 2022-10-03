import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { data: null },
  reducers: {
    setModalData: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
});

export default modalSlice;
