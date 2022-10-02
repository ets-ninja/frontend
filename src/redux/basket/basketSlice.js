import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    basketName: '',
    description: '',
    moneyGoal: '',
    daysCount: '',
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