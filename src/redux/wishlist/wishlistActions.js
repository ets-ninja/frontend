import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const getWishlistItems = createAsyncThunk(
  '/wishlist',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/wishlist');
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
