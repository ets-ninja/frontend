import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { firstName, lastName, publicName, email, password },
    { rejectWithValue },
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post(
        '/api/user/signup',
        { firstName, lastName, publicName, email, password },
        config,
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('api/auth/login', { email, password });
      localStorage.setItem('userToken', data.token);
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

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/user');
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
