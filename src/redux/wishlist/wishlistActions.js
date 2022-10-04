import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWishlistItems = createAsyncThunk(
  '/wishlist',
  async (arg, { getState, rejectWithValue }) => {
    const { user } = getState();
    const config = {
      headers: {
        Authorization: `${user.userToken}`,
      },
    };

    try {
      const { data } = await axios.get('/api/wishlist', config);
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
