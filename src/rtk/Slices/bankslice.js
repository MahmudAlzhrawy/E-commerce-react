import { createSlice } from "@reduxjs/toolkit";

export const bankSlice = createSlice({
    initialState: 1500,
    name:'bankSlice',
    reducers:{
        withdraw: (state, action) => {
          return state = state - action.payload;
        } ,
        debosite: (state, action) => {
          return  state = state + action.payload;  
        },
    }
})
export const { debosite, withdraw } = bankSlice.actions;
export default bankSlice.reducer;