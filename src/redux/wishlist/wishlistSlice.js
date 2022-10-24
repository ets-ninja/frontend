import { createSlice } from '@reduxjs/toolkit';
import {
  getSortedWishlistItems,
  getSingleWishlistItem,
  deleteWishlistItem,
  updateWishlistItem,
  createWishlistItem,
} from './wishlistActions';

const initialState = {
  loading: false,
  items: [],
  singleItemInfo: {},
  pageCount: 0,
  totalItemsQuantity: null,
  itemToDelete: { id: null, from: '' },
  newWishliItemPhoto: '',
  error: null,
  success: false,
  successInfo: '',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setItemToDelete: (state, { payload }) => {
      state.itemToDelete = payload;
    },
    setWishitemPhoto: (state, { payload }) => {
      state.newWishliItemPhoto = payload;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
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
      state.successInfo = '';
    },
    [deleteWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = true;
      state.successInfo = 'Your wish has been deleted';
    },
    [deleteWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //updateWishlistItem
    [updateWishlistItem.pending]: state => {
      state.loading = true;
      state.error = null;
      state.successInfo = '';
    },
    [updateWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successInfo = 'Your wish has been updated';
      state.singleItemInfo = payload.updatedItem;
    },
    [updateWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //createWishlistItem
    [createWishlistItem.pending]: state => {
      state.loading = true;
      state.error = null;
      state.successInfo = '';
    },
    [createWishlistItem.fulfilled]: (state, { payload }) => {
      state.loading = true;
      state.success = true;
      state.successInfo = 'Your wish has been saved';
    },
    [createWishlistItem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setSortingOptions,
  setWishlistPage,
  setItemToDelete,
  setWishitemPhoto,
  setSuccess,
  setLoading,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
