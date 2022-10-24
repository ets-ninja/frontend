import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  confirmEmail,
  requestNewCorfirmEmail,
  getUserDetails,
  updateUserInfo,
  updateUserPassword,
  updateUserPhoto,
  addNotificationToken,
} from './userActions';

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
  successInfo: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetSucces(state) {
      state.success = false;
    },
    setUser(state, { payload }) {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    //register
    [registerUser.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // confirm email
    [confirmEmail.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [confirmEmail.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.loading = false;
      state.success = true;
    },
    [confirmEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // resend confirm email
    [requestNewCorfirmEmail.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [requestNewCorfirmEmail.fulfilled]: state => {
      state.loading = false;
      state.error = null;
    },
    [requestNewCorfirmEmail.rejected]: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = payload;
    },
    //getUser
    [getUserDetails.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // updateUserInfo
    [updateUserInfo.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successInfo = payload;
    },
    [updateUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // updateUserPassword
    [updateUserPassword.pending]: state => {
      state.success = false;
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
    // updateUserPhoto
    [updateUserPhoto.pending]: state => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [updateUserPhoto.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.successInfo = payload;
    },
    [updateUserPhoto.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // addNotificationToken
    [addNotificationToken.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [addNotificationToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [addNotificationToken.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetSucces, setUser } = userSlice.actions;
export default userSlice.reducer;
