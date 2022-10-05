import { createSlice } from '@reduxjs/toolkit';
import { getWishlistItems } from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  sorting: {},
  error: null,
  success: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setSortedWishlistItems: (state, { payload }) => {
      state.sorting = payload;
    },
  },
  extraReducers: {
    //getWishlistItems
    [getWishlistItems.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getWishlistItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = Object.values({ ...payload });
    },
    [getWishlistItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setSortedWishlistItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
