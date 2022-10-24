import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const getNotifCosExp = createAsyncThunk(
  'notification/getNotifCosExp',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/notification/send_notification_cos_expr',
      );
      return data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response?.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
