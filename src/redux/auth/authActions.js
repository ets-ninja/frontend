import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/auth/refresh');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (notificationToken, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/logout', {
        notificationToken: '1',
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('api/auth/login', { email, password });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
