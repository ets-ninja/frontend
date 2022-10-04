import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const get_owner_baskets = createAsyncThunk(
  'basket/get_owner_baskets',
   async(  
    { finished },
    { rejectWithValue }
    ) => {
    console.log('axios');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    try {
      const baskets = await axios.get(
        '/api/basket/get_owner_baskets',
        config,
      );
      
      if(!baskets.data){
        return rejectWithValue({ message: "There is an error with getting baskets" });
      }

      return baskets.data;
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
      { finished },
      { rejectWithValue }
      ) => {
    console.log('axios');

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };
    
    try {
        const baskets = await axios.get(
          '/api/basket/get_coowner_baskets',
          config,
        );

        if(!baskets.data){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }

        return baskets.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
    }
    },
);

export const get_hot_baskets = createAsyncThunk(
    'basket/get_hot_baskets',
    async(  
      { finished },
      { rejectWithValue }
      ) => {
    console.log('axios');

    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    try {
        const baskets = await axios.get(
        '/api/basket/get_hot_baskets',
        config,
        );

        if(!baskets.data){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }

        return baskets.data;
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
      { finished },
      { rejectWithValue }
      ) => {
    console.log('axios');

    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    try {
        const baskets = await axios.get(
        '/api/basket/get_public_baskets',
        config,
        );

        if(!baskets.data){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }

        return baskets.data;
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
      { finished },
      { rejectWithValue }
      ) => {
    console.log('axios');

    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    };
    
    try {
        const baskets = await axios.get(
        '/api/basket/get_private_baskets',
        config,
        );

        if(!baskets.data){
          return rejectWithValue({ message: "There is an error with getting baskets" });
        }

        return baskets.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
    }
    },
);