import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { firstName, lastName, publicName, email, password },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(firstName, lastName, publicName, email, password);

    try {
      await axios.post(
        '/api/user/signup',
        { firstName, lastName, publicName, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'api/auth/login',
        { email, password },
        config
      );
      localStorage.setItem('userToken', data.userToken);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    const { user } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.userToken}`,
      },
    };

    try {
      const { data } = await axios.get('/api/user', config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
