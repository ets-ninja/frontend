import { createSlice } from '@reduxjs/toolkit';
import { get_owner_baskets, get_coowner_baskets, get_public_baskets, get_private_baskets, get_basket_by_id } from './basketActions';

const initialState = {
  loading: true,
  basket: { ownerId: {  } },
  baskets: [],
  paginationData: { page: 1, maxPageAmount: 1, currentType: "Created by me", currentOrder: "Newest to oldest" },
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
      state.basket = {};
      state.baskets = [];
      state.paginationData = { page: 1, maxPageAmount: 1, currentType: "Created by me", currentOrder: "Newest to oldest" }
    },
    changePage: (state, { payload }) => {
      state.paginationData.page = payload.value;
    },
    changeType: (state, { payload }) => {
      state.paginationData.currentType = payload.value;
    },
    changeOrder: (state, { payload }) => {
      state.paginationData.currentOrder = payload.value;
    }
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
      state.baskets = payload.basketData;
      state.paginationData.maxPageAmount = payload.paginationData.maxPageAmount;
    },
    [get_owner_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.baskets = [];
      state.paginationData.maxPageAmount = 1;
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
      state.baskets = payload.basketData;
      state.paginationData.maxPageAmount = payload.paginationData.maxPageAmount;
    },
    [get_coowner_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.baskets = [];
      state.paginationData.maxPageAmount = 1;
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
      state.baskets = payload.basketData;
      state.paginationData.maxPageAmount = payload.paginationData.maxPageAmount;
    },
    [get_public_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.baskets = [];
      state.paginationData.maxPageAmount = 1;
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
      state.baskets = payload.basketData;
      state.paginationData.maxPageAmount = payload.paginationData.maxPageAmount;
    },
    [get_private_baskets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.baskets = [];
      state.paginationData.maxPageAmount = 1;
      state.error = payload;
    },
    //get_basket_by_id
    [get_basket_by_id.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [get_basket_by_id.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.basket = payload.basket;
    },
    [get_basket_by_id.rejected]: (state, { payload }) => {
      state.loading = false;
      state.basket = { ownerId: {  } };
      state.error = payload;
    },
  },
});

export const { changePage, changeType, changeOrder } = basketSlice.actions;
export default basketSlice.reducer;
