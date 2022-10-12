import { createSlice } from '@reduxjs/toolkit';
import { getSortedWishlistItems } from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  sorting: { filed: 'createdAt', order: '1' },
  pageCount: null,
  activePage: 0,
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
    setWishlistPage: (state, { payload }) => {
      state.activePage = payload;
    },
  },
  extraReducers: {
    //getSortedWishlistItems
    [getSortedWishlistItems.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getSortedWishlistItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload.sortedItems;
      state.pageCount = payload.pagination.pageCount;
    },
    [getSortedWishlistItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setSortedWishlistItems, setWishlistPage } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
