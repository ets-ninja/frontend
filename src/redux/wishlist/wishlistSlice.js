import { createSlice } from '@reduxjs/toolkit';
import { getWishlistItems } from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  error: null,
  success: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: {
    //getWishlistItems
    [getWishlistItems.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getWishlistItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [getWishlistItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default wishlistSlice.reducer;
