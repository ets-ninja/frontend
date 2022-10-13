import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationToken: null,
  newNotification: false,
  notificationList: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.notificationToken = payload;
    },
    addNotification: (state, { payload }) => {
      state.notificationList.unshift(payload);
      state.newNotification = payload;
    },
    addMultipleNotification: (state, { payload }) => {
      state.notificationList = state.notificationList.concat(payload);
      //state.newNotification = payload[0];
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
  extraReducers: {},
});

export const {
  addToken,
  addNotification,
  addMultipleNotification,
  removeNotification,
  clearNewNotification,
  clearNotificationsList,
} = notificationSlice.actions;
export default notificationSlice.reducer;
