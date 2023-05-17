import { configureStore } from "@reduxjs/toolkit";
import detailSlice from "./detailSlice";
import theatreScreenSlice from "./theatreScreenSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer : {
     detail : detailSlice ,
     screen : theatreScreenSlice,
     cart : cartSlice
    }
})