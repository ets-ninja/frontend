import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const createPayment = createAsyncThunk(
  'payment/donate',
  async ({ amount, description, last4 }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/payment/payment_secret', {
        amount,
        description,
        last4,
      });
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
