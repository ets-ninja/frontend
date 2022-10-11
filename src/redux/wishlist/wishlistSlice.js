import { createSlice } from '@reduxjs/toolkit';
import { getWishlistItems, getSortedWishlistItems } from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  sorting: { filed: 'createdAt', order: '1' },
  totalItems: null,
  pageCount: null,
  activePage: 0,
  itemToRemove: null,
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
    setItemToRemove: (state, { payload }) => {
      state.itemToRemove = payload;
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
    //getSortedWishlistItems
    [getSortedWishlistItems.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getSortedWishlistItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload.sortedItems;
      state.pageCount = payload.pagination.pageCount;
      state.totalItems = payload.pagination.countItems;
    },
    [getSortedWishlistItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setSortedWishlistItems, setWishlistPage, setItemToRemove } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
