import { createSlice } from '@reduxjs/toolkit';
import {
  getSortedWishlistItems,
  getSingleWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
} from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  singleItemInfo: {},
  sortingOptions: { field: 'createdAt', order: '-1' },
  pageCount: null,
  totalItemsQuantity: null,
  activePage: 0,
  itemToDelete: null,
  error: null,
  success: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setSortingOptions: (state, { payload }) => {
      state.sortingOptions = payload;
    },
    setWishlistPage: (state, { payload }) => {
      state.activePage = payload;
    },
    setItemToDelete: (state, { payload }) => {
      state.itemToDelete = payload;
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
      state.totalItemsQuantity = payload.pagination.countItems;
    },
    [getSortedWishlistItems.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //getSingleWishlistItem
    [getSingleWishlistItem.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getSingleWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleItemInfo = payload;
    },
    [getSingleWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //deleteWishlistItem
    [deleteWishlistItem.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [deleteWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [deleteWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //updateWishlistItem
    [updateWishlistItem.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [updateWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleItemInfo = payload.updatedItem;
    },
    [updateWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setSortingOptions, setWishlistPage, setItemToDelete } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
