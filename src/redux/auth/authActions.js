import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

import { setUser } from '../user/userSlice';

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/auth/refresh');
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (arg, { getState, rejectWithValue, dispatch }) => {
    const { notificationToken } = getState().notification;
    try {
      const { data } = await axios.post('/api/auth/logout', {
        notificationToken,
      });
      dispatch(setUser(null));
      return data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post('api/auth/login', { email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
