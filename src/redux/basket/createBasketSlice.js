import { createSlice } from '@reduxjs/toolkit';
import axios from '../../services/axios/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createBasket = createAsyncThunk(
  'creationBasket/createBasket',
  async (arg, { rejectWithValue, getState }) => {

    const basketState = getState().creationBasket
    const newBasket = {
        basketName: basketState.basketName,
        description: basketState.description,
        moneyGoal: basketState.moneyGoal,
        expirationDate: basketState.expirationDate,
        isPublic: basketState.isPublic,
        photoTag: basketState.photoTag
      };
    try {
      await axios.post('http://localhost:5050/api/basket/create_basket', newBasket);
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


const initialState = {
    basketName: '',
    description: '',
    moneyGoal: '',
    expirationDate: null,
    isPublic: false,
    photoTag: '',
    loading: false,
    success: false,
    successInfo: '',
    error: null,
    errorInfo: ''
}


const basketSlice = createSlice({
    name: 'creationBasket',
    initialState,
    reducers: {
        setBasketName: (state, action) => {
            state.basketName = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setMoneyGoal: (state, action) => {
            state.moneyGoal = action.payload
        },
        setExpirationDate: (state, action) => {
            state.expirationDate = action.payload
        },
        setIsPublic: (state) => {
            state.isPublic = !state.isPublic
        },
        setPhotoTag: (state, action) => {
            state.photoTag = action.payload
        },

        pushBasketToSomewhere: (state) => {

            // const newBasket = {
            //     basketName: state.basketName,
            //     description: state.description,
            //     moneyGoal: state.moneyGoal,
            //     expirationDate: state.expirationDate,
            //     isPublic: state.isPublic,
            //   };


            // axios.post('http://localhost:5050/api/basket/create_basket', Basket)
            // createBasket(Basket)

            // state.basketName = ''
            // state.description = ''
            // state.moneyGoal = ''
            // state.expirationDate = null
            // state.isPublic = false
            // state.photoTag = null
        },

        cancelCreation: (state) => {
            state.basketName = ''
            state.description = ''
            state.moneyGoal = ''
            state.expirationDate = null
            state.isPublic = false
            state.photoTag = null
        }
    },
    extraReducers: {
        [createBasket.pending]: state => {
          state.loading = true;
          state.error = null;
          state.success = false;
          state.successInfo = '';
          state.errorInfo = '';
        },
        [createBasket.fulfilled]: (state, { payload }) => {
          state.loading = false;
          state.success = true;
          state.successInfo = 'Basket is created!';
          state.error = null;
          state.basketName = '';
          state.description = '';
          state.moneyGoal = '';
          state.expirationDate = null;
          state.isPublic = false;
          state.photoTag = null;
        },
        [createBasket.rejected]: (state, { payload }) => {
          state.loading = false;
          state.success = false;
          state.error = payload;
          state.errorInfo = 'Error from server';
          state.basketName = '';
          state.description = '';
          state.moneyGoal = '';
          state.expirationDate = null;
          state.isPublic = false;
          state.photoTag = null;
        },
    }
})

export default basketSlice.reducer;

export const {setBasketName, setDescription, setMoneyGoal, setExpirationDate, setIsPublic, pushBasketToSomewhere, cancelCreation, setPhotoTag} = basketSlice.actions

export const selectBasket = (state) => state.creationBasket;

