import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from './features/notify/notifySlice';
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'


export const store = configureStore({
    reducer: {
        userState: userReducer,
        cartState: cartReducer,
        notifyState: notifyReducer
    }
})