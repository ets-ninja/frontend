import { createSlice } from '@reduxjs/toolkit';
import axios from '../../services/axios/index';


const initialState = {
    basketName: '',
    description: '',
    moneyGoal: '',
    expirationDate: null,  
    isPublic: false,
    photoTag: null,
}


const basketSlice = createSlice({
    name: 'basket',
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

            const Basket = {
              basketName: state.basketName,
              description: state.description,
              moneyGoal: state.moneyGoal,
              expirationDate: state.expirationDate,
              isPublic: state.isPublic,
              createdAt: +new Date()
            };

            axios.post('http://localhost:5050/api/basket', Basket)

            state.basketName = ''
            state.description = ''
            state.moneyGoal = ''
            state.expirationDate = null
            state.isPublic = false
            state.photoTag = null
        },

        cancelCreation: (state) => {
            state.basketName = ''
            state.description = ''
            state.moneyGoal = ''
            state.expirationDate = null
            state.isPublic = false
            state.photoTag = null
        }
    }
})

export default basketSlice.reducer;

export const {setBasketName, setDescription, setMoneyGoal, setExpirationDate, setIsPublic, pushBasketToSomewhere, cancelCreation} = basketSlice.actions

export const selectBasket = (state) => state.basket;

// todo: basket slice rename + calendar (expire time) + num comp(reusable)
// todo: + backend creation + check modal + vsplivashka + crop :) (BOGD1Y) 