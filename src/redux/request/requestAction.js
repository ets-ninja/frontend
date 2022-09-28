import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const request = createAsyncThunk(
  'request',
  async ({ method, url, body }, { rejectWithValue }) => {
    try {
      let response;
      if (method === 'GET') {
        response = await axios.get(url, body);
      } else if (method === 'POST') {
        response = await axios.post(url, body);
      } else if (method === 'PATCH') {
        response = await axios.patch(url, body);
      } else if (method === 'PUT') {
        response = await axios.put(url, body);
      } else if (method === 'DELETE') {
        response = await axios.delete(url, body);
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
