import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cartChange',
    initialState : {
        cart : []
    },
    reducers : {
        addToCartDetail : (state, action) =>{
            state.cart = [...state.cart, action.payload]
            console.log(action)
        },
        removeCartDetail : (state, action) =>{
        state.cart = state.cart.filter(e => e.id !== action.payload.id)
        console.log(action);
        }
    }
})

export const {addToCartDetail, removeCartDetail} = cartSlice.actions;
export default cartSlice.reducer;