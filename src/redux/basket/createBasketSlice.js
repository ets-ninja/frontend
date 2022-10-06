import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    basketName: '',
    description: '',
    moneyGoal: '',
    mlsCount: null,  
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
        setMlsCount: (state, action) => {
            state.mlsCount = action.payload
        },
        setIsPublic: (state) => {
            state.isPublic = !state.isPublic
        },
        setPhotoTag: (state, action) => {
            state.photoTag = action.payload
        },
        // TODO axios.post(maybe) and try catch from (sentry)
        pushBasketToSomewhere: (state) => {

            const Basket = {
              basketName: state.basketName,
              description: state.description,
              moneyGoal: state.moneyGoal,
              mlsCount: state.mlsCount,
              isPublic: state.isPublic,
            };

            // axios.post('/', () => {Post Basket})

            state.basketName = ''
            state.description = ''
            state.moneyGoal = ''
            state.mlsCount = null
            state.isPublic = false
            state.photoTag = null
        }
    }
})

export default basketSlice.reducer;

export const {setBasketName, setDescription, setMoneyGoal, setMlsCount, setIsPublic, pushBasketToSomewhere} = basketSlice.actions

export const selectBasket = (state) => state.basket;

// todo: basket slice rename + calendar (expire time) + num comp(reusable)
// todo: + backend creation + check modal + vsplivashka + crop :) (BOGD1Y) 