import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const get_owner_baskets = createAsyncThunk(
  'jar/get_owner_jars',
  async ({ archived, page, order }, { rejectWithValue }) => {
    try {
      const req = await axios.get('api/jar/get_owner_jars', {
        params: { archived, page, order },
      });

      if (!req.data.basketData) {
        return rejectWithValue({
          message: 'There is an error with recieving jars',
        });
      }

      return {
        basketData: req.data.basketData,
        paginationData: req.data.paginationData,
      };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const get_coowner_baskets = createAsyncThunk(
  'jar/get_coowner_jars',
  async ({ archived, page, order }, { rejectWithValue }) => {
    try {
      const req = await axios.get('/api/jar/get_coowner_jars', {
        params: { archived, page, order },
      });

      if (!req.data.basketData) {
        return rejectWithValue({
          message: 'There is an error with recieving jars',
        });
      }

      return {
        basketData: req.data.basketData,
        paginationData: req.data.paginationData,
      };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const get_public_baskets = createAsyncThunk(
  'jar/get_public_jars',
  async ({ archived, page, order }, { rejectWithValue }) => {
    try {
      const req = await axios.get('/api/jar/get_public_jars', {
        params: { archived, page, order },
      });

      if (!req.data.basketData) {
        return rejectWithValue({
          message: 'There is an error with recieving jars',
        });
      }

      return {
        basketData: req.data.basketData,
        paginationData: req.data.paginationData,
      };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const get_private_baskets = createAsyncThunk(
  'jar/get_private_jars',
  async ({ archived, page, order }, { rejectWithValue }) => {
    try {
      const req = await axios.get('/api/jar/get_private_jars', {
        params: { archived, page, order },
      });

      if (!req.data.basketData) {
        return rejectWithValue({
          message: 'There is an error with recieving jars',
        });
      }

      return {
        basketData: req.data.basketData,
        paginationData: req.data.paginationData,
      };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const get_basket_by_id = createAsyncThunk(
  'jar/get_jar_by_id',
  async ({ id }, { rejectWithValue }) => {
    try {
      const req = await axios.get('api/jar/get_jar_by_id', { params: { id } });

      if (!req.data.basket) {
        return rejectWithValue({ message: `There are no jar with ${id} id` });
      }

      return { basket: req.data.basket };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const get_jar_finance_by_id = createAsyncThunk(
  'jar/get_jar_finance_by_id',
  async ({ id }, { rejectWithValue }) => {
    try {
      const req = await axios.get('api/jar/get_jar_finance_by_id', {
        params: { id },
      });

      if (!req.data.basket) {
        return rejectWithValue({ message: `There are no jar with ${id} id` });
      }

      return { basket: req.data.basket };
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const update_jar = createAsyncThunk(
  'jar/update_jar',
  async (
    { id, name, description, goal, expirationDate },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.put('api/jar/update_jar', {
        id,
        name,
        description,
        goal,
        expirationDate,
      });

      return data;
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const update_jar_image = createAsyncThunk(
  'jar/update_jar_image',
  async ({ id, image }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('api/jar/update_jar_image', {
        id,
        image,
      });

      return data;
    } catch (error) {
      if (error?.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
