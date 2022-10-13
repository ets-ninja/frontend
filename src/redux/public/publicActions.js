import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const fetchPublicJars = createAsyncThunk(
  'public/fetchPublicJars',
  async (params, { rejectWithValue }) => {
    try {
      const publicJars = await axios.get('/api/public', {
        params,
      });
      return publicJars.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchFilteredJars = createAsyncThunk(
  'public/fetchFilteredJars',
  async (params, { rejectWithValue }) => {
    try {
      const filteredJars = await axios.get('/api/public/filter', {
        params,
      });
      return filteredJars.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserJars = createAsyncThunk(
  'public/fetchUserJars',
  async (params, { rejectWithValue }) => {
    try {
      const userJars = await axios.get('/api/public/user', {
        params,
      });
      return userJars.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
