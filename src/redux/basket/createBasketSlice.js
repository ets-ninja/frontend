import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    basketName: '',
    description: '',
    moneyGoal: '',
    daysCount: undefined,  //! only when undefined comp works as expected  
    isPublic: false,

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
        setDaysCount: (state, action) => {
            state.daysCount = action.payload
        },
        setIsPublic: (state) => {
            state.isPublic = !state.isPublic
        },
        // TODO axios.post(maybe) and try catch from (sentry)
        pushBasketToSomewhere: (state) => {

            const Basket = {
              basketName: state.basketName,
              description: state.description,
              moneyGoal: state.moneyGoal,
              daysCount: state.daysCount,
              isPublic: state.isPublic,
            };

            state.basketName = ''
            state.description = ''
            state.moneyGoal = ''
            state.daysCount = ''
            state.isPublic = false
        }
    }
})

export default basketSlice.reducer;

export const {setBasketName, setDescription, setMoneyGoal, setDaysCount, setIsPublic, pushBasketToSomewhere} = basketSlice.actions

export const selectBasket = (state) => state.basket;

// todo: basket slice rename + calendar (expire time) + num comp(reusable)
// todo: + backend creation + check modal + vsplivashka + crop :) (BOGD1Y) 