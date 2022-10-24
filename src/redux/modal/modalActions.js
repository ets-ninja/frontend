import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const fetchModalJar = createAsyncThunk(
  'public/fetchModalJar',
  async (params, { rejectWithValue }) => {
    try {
      const modalJar = await axios.get('/api/public/modal', {
        params,
      });
      return modalJar.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
