import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios/';

export const get_owner_baskets = createAsyncThunk(
  'basket/get_owner_baskets',
   async(  
    { archived, page, order },
    { rejectWithValue }
    ) => {
    
    try {
      const req = await axios.get(
        'api/basket/get_owner_baskets', 
        { params: { archived, page, order }} 
        );

      if(!req.data.basketData){
        return rejectWithValue({ message: "There is an error with getting baskets" });
      }

      return {basketData: req.data.basketData, paginationData: req.data.paginationData};
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);


export const get_coowner_baskets = createAsyncThunk(
    'basket/get_coowner_baskets',
    async(  
      { archived, page, order },
      { rejectWithValue }
      ) => {
    
    try {
        const req = await axios.get(
          '/api/basket/get_coowner_baskets',
          { params: { archived, page, order } },
        );

        if(!req.data.basketData){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }
  
        return {basketData: req.data.basketData, paginationData: req.data.paginationData};
    } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
    }
    },
);

export const get_public_baskets = createAsyncThunk(
    'basket/get_public_baskets',
    async(  
      { archived, page, order },
      { rejectWithValue }
      ) => {
    
    try {
        const req = await axios.get(
        '/api/basket/get_public_baskets',
        { params: { archived, page, order } },
        );

        if(!req.data.basketData){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }
  
        return {basketData: req.data.basketData, paginationData: req.data.paginationData};
    } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
    }
    },
);

export const get_private_baskets = createAsyncThunk(
    'basket/get_private_baskets',
    async(  
      { archived, page, order },
      { rejectWithValue }
      ) => {
    
    try {
        const req = await axios.get(
        '/api/basket/get_private_baskets',
        { params: { archived, page, order } },
        );

        if(!req.data.basketData){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }
  
        return {basketData: req.data.basketData, paginationData: req.data.paginationData};
    } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
    }
    },
);
