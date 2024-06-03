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
        },
        removeNotify: (state, action)=>{
            const {notify} = action.payload;
            const newState = state.filter(n => n.content !== notify);
            localStorage.setItem('notifies', JSON.stringify(newState));
            return newState;

        }
    }
})

export const {createNotify,removeNotify} = notifySlice.actions;
export default notifySlice.reducer;