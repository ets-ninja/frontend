import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { firstName, lastName, publicName, email, password },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post('/api/user/signup', {
        firstName,
        lastName,
        publicName,
        email,
        password,
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

export const confirmEmail = createAsyncThunk(
  'user/confirm_email',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.post('/api/user/signup/confirm', {
        userId,
      });
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

export const requestNewCorfirmEmail = createAsyncThunk(
  'user/resend_confirm',
  async ({ code, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/api/user/signup/resend_confirm', {
        code,
        userId,
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

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/user');
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

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ firstName, lastName, publicName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/api/user/update', {
        firstName,
        lastName,
        publicName,
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

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async ({ password, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/api/user/update_password', {
        password,
        newPassword,
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

export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async ({ userPhoto }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/user/update_photo', {
        userPhoto,
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
