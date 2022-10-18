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

export const getSingleWishlistItem = createAsyncThunk(
  '/wishlist-get-item',
  async (arg, { rejectWithValue }) => {
    const { id } = arg;
    try {
      const { data } = await axios.get(`api/wishlist/get-item/${id}`);
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

export const deleteWishlistItem = createAsyncThunk(
  '/wishlist-delete-item',
  async (arg, { rejectWithValue }) => {
    const { id } = arg;
    try {
      const { data } = await axios.delete(`api/wishlist/delete/${id}`);
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

export const updateWishlistItem = createAsyncThunk(
  '/wishlist-update-item',
  async (arg, { rejectWithValue }) => {
    const { id, data: payload } = arg;
    try {
      const { data } = await axios.patch(`api/wishlist/update/${id}`, payload);
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

export const createWishlistItem = createAsyncThunk(
  '/wishlist-create-item',
  async (arg, { rejectWithValue }) => {
    const { data: payload } = arg;
    try {
      const { data } = await axios.post(`api/wishlist/`, payload);
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
