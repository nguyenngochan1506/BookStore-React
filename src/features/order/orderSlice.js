import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('orderHistory')) || [];


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        confirmOrder: (state, action)=>{
            const {orderId} = action.payload
            const order = state.find(o => o.id == orderId);
            order.state.name = 'Đã Xác Nhận'
            localStorage.setItem('orderHistory', JSON.stringify(state));
        }
    }
})

export const {confirmOrder} = orderSlice.actions
export default orderSlice.reducer;