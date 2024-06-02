import { createSlice } from "@reduxjs/toolkit";
import { Notify } from "../../model";

const initialState = JSON.parse(localStorage.getItem('notifies')) || [];

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers:{
        createNotify: (state, action) =>{
            const {notify} = action.payload;
            state.push(new Notify(notify))
            localStorage.setItem('notifies', JSON.stringify(state))
        }
    }
})

export const {createNotify} = notifySlice.actions;
export default notifySlice.reducer;