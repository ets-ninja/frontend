import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const fetchPublicJars = createAsyncThunk(
  'public/fetchPublicJars',
  async (params, { rejectWithValue }) => {
    try {
      console.log('fetch public');
      const publicJars = await axios.get('/api/public', {
        params,
      });
      console.log('fetch public complete');
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
      console.log('fetch filter');
      const filteredJars = await axios.get('/api/public/filter', {
        params,
      });
      console.log('fetch filter complete');
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
      console.log('fetch user');
      const userJars = await axios.get('/api/public/user', {
        params,
      });
      console.log('fetch user complete');
      return userJars.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
