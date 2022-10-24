import { createSlice } from '@reduxjs/toolkit';

import { getNotifCosExp } from './notificationActions';

const initialState = {
  isFCMSupported: null,
  areMessagesLoaded: false,
  notificationToken: null,
  newNotification: false,
  notificationList: [],
  loading: false,
  error: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFCMSupport: (state, { payload }) => {
      state.isFCMSupported = payload;
    },
    addToken: (state, { payload }) => {
      state.notificationToken = payload;
    },
    addNotification: (state, { payload }) => {
      state.notificationList.unshift(payload);
      state.newNotification = payload;
    },
    addMultipleNotification: (state, { payload }) => {
      if (!state.areMessagesLoaded) {
        state.notificationList = state.notificationList.concat(payload);
        state.areMessagesLoaded = true;
      }
    },
    removeNotification: (state, { payload }) => {
      state.notificationList = state.notificationList.filter(
        notif => notif.messageId !== payload.messageId,
      );
    },
    clearNewNotification: state => {
      state.newNotification = false;
    },
    clearNotificationsList: state => {
      state.notificationList = [];
      state.newNotification = false;
    },
  },
  extraReducers: {
    [getNotifCosExp.pending]: state => {
      state.loading = true;
      state.error = false;
    },
    [getNotifCosExp.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [getNotifCosExp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  setFCMSupport,
  addToken,
  addNotification,
  addMultipleNotification,
  removeNotification,
  clearNewNotification,
  clearNotificationsList,
} = notificationSlice.actions;
export default notificationSlice.reducer;
