import { createSlice } from "@reduxjs/toolkit";


const theatreScreenSlice = createSlice({
    name : 'screen',
    initialState : {
        seats : localStorage.getItem('seatSelected') || 0,
        theatreDetail : JSON.parse(localStorage.getItem('theatreDetail')) || {},
        isScreenPageOpen : localStorage.getItem('screenPageOpen') || false,
    },
    reducers : {
        screenSeats : (state, action) =>{
            state.seats = action.payload
        },
        getTheatreDetail : (state, action) =>{
            state.theatreDetail = action.payload
        },
        screenPage : (state, action) =>{
            state.isScreenPageOpen = action.payload;
        }
    }
})

export const {screenSeats, getTheatreDetail, screenPage} = theatreScreenSlice.actions;
export default theatreScreenSlice.reducer;