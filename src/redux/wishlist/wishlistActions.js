import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const getSortedWishlistItems = createAsyncThunk(
  '/wishlist-sorting',
  async (arg, { rejectWithValue }) => {
    const { page, field, order } = arg.options;
    try {
      const { data } = await axios.get(`/api/wishlist/sorting`, {
        params: { page, field, order },
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
