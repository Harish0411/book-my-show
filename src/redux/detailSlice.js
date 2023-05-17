import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name : 'detailed_page',
    initialState : {
        detail :  JSON.parse(localStorage.getItem('movieDetail')) || [],
        seatDetail : JSON.parse(localStorage.getItem('seatDetail')) || [],
    },
    reducers : {
        detailPage : (state, action) => {
            console.log(action);
            state.detail = action.payload;
        },
        getSeatDetail : (state, action) =>{
            state.seatDetail = action.payload
        }
    }
})

export const {detailPage, getSeatDetail} =  detailSlice.actions;
export default detailSlice.reducer;