import {
  fetchPublicJars,
  fetchFilteredJars,
  fetchUserJars,
} from './publicActions';
import { createSlice } from '@reduxjs/toolkit';

const publicSlice = createSlice({
  name: 'public',
  initialState: {
    data: [],
    users: null,
    pagination: { pageCount: null, jarsCount: null },
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = [payload];
    },
  },
  extraReducers: {
    //public jars
    [fetchPublicJars.pending]: state => {
      state.users = null;
      state.isLoading = true;
      state.error = null;
    },
    [fetchPublicJars.fulfilled]: (state, { payload }) => {
      state.data = payload.jars;
      state.pagination = payload.pagination;
      state.isLoading = false;
    },
    [fetchPublicJars.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    //filtered jars
    [fetchFilteredJars.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchFilteredJars.fulfilled]: (state, { payload }) => {
      state.data = payload.jars;
      state.users = payload.users;
      state.pagination = payload.pagination;
      state.isLoading = false;
    },
    [fetchFilteredJars.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    //user jars
    [fetchUserJars.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchUserJars.fulfilled]: (state, { payload }) => {
      state.data = payload?.jars;
      state.pagination = payload.pagination;
      state.isLoading = false;
    },
    [fetchUserJars.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default publicSlice;
