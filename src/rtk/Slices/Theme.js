import { createSlice } from "@reduxjs/toolkit";
const defaultMode = localStorage.getItem("Mode") === null ? false : JSON.parse(localStorage.getItem("Mode"))
export const theme= createSlice({
initialState: defaultMode,
    name:"theme",
    reducers:{
        ToggleTheme:(state,action)=>{
            
            return !action.payload;
            
        }
    }
    

})
export const {ToggleTheme}=theme.actions;
export default theme.reducer;