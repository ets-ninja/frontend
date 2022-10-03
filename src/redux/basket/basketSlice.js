import { createSlice } from '@reduxjs/toolkit';
import { get_owner_baskets, get_coowner_baskets, get_hot_baskets, get_public_baskets, get_private_baskets } from './basketActions';

const initialState = {
  loading: true,
  baskets: [],
  error: null,
  success: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    logout: state => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    //get_owner_baskets
    [get_owner_baskets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_owner_baskets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.baskets = payload;

    },
    [get_owner_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get_coowner_baskets
    [get_coowner_baskets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_coowner_baskets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.baskets = payload;
    },
    [get_coowner_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get_hot_baskets
    [get_hot_baskets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_hot_baskets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.baskets = payload;
    },
    [get_hot_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get_public_baskets
    [get_public_baskets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_public_baskets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.baskets = payload;
    },
    [get_public_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get_private_baskets
    [get_private_baskets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_private_baskets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.baskets = payload;
    },
    [get_private_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default basketSlice.reducer;
