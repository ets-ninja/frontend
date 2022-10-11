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
    removeNotification: (state, { payload }) => {
      state.notificationList = state.notificationList.filter(
        notif => notif.messageId !== payload.messageId,
      );
    },
    clearNewNotification: state => {
      state.newNotification = false;
    },
  },
  extraReducers: {},
});

export const { addToken, addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
