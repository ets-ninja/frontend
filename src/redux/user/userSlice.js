import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  getUserDetails,
  updateUserInfo,
  updateUserPassword,
} from './userActions';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    //register
    [registerUser.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //getUser
    [getUserDetails.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // updateUserInfo
    [updateUserInfo.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.info = payload;
    },
    [updateUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // updateUserPassword
    [updateUserPassword.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [updateUserPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [updateUserPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
