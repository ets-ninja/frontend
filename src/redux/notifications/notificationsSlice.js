import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationsList: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      state.notificationsList.unshift(payload);
    },
    removeNotification: (state, { payload }) => {
      state.notificationsList = state.notificationsList.filter(
        notif => notif.messageId !== payload.messageId,
      );
    },
  },
  extraReducers: {},
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
