import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const themes = {
    winter: 'winter',
    dark: 'dark'
}
const getThemeFromLocalStorage = ()=>{
    const theme =  localStorage.getItem('theme') || themes.winter;
    document.documentElement.setAttribute('data-theme', theme)
    return theme;
}
const getUserFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('user')) || null;
}

const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage()   
}

const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        loginUser: (state, action)=>{
            const {user, loginDate} = action.payload

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loginDate', loginDate)
            state.user = user;
        },
        logoutUser: (state)=>{
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('loginDate')
            toast('Đăng Xuất Thành Công!')
        },
        updateUserInfo: (state, action)=>{
            const {user} = action.payload

            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        toggleTheme: (state) =>{
           const {dark, winter} = themes;
           state.theme = state.theme === dark ? winter : dark;
           document.documentElement.setAttribute('data-theme', state.theme)
           localStorage.setItem('theme', state.theme)
        },
        subscribeNotify: (state)=>{
            state.user.notify = true;
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
})

export const {loginUser, logoutUser, toggleTheme, updateUserInfo,subscribeNotify } = userSlice.actions;

export default userSlice.reducer;