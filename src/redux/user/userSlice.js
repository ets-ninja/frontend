import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserInfo,
  updateUserPassword,
} from './userActions';

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  info: {},
  infoPassword: {},
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
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
    //login
    [loginUser.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
    },
    [loginUser.rejected]: (state, { payload }) => {
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
      console.log(payload);
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
      state.infoPassword = payload;
    },
    [updateUserPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
