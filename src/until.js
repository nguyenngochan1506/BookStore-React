import { useEffect, useState } from "react";

const HOST_PROVINCES = 'https://vapi.vnappmob.com'

export const dinhDangTien = (soTien)=>{
    // Sử dụng Intl.NumberFormat để định dạng số tiền theo kiểu Việt Nam
    let formatter = new Intl.NumberFormat('vi-VN');
    
    // Định dạng số tiền và thêm đơn vị "đ"
    return formatter.format(Math.floor(soTien/1000) * 1000) + "đ";
}

export const getAllProvinces = async () => {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    try {
        const response = await fetch(`${HOST_PROVINCES}/api/province/`, headers)
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const useDebounce = (callback, delay=500) =>{
    const [debounceCallback, setDebounceCallback] = useState(callback);
    useEffect(()=>{
        const timeout = setTimeout(() => {
            setDebounceCallback(callback);
        }, delay);
        return ()=> clearInterval(timeout)
    }, [callback, delay])
    return debounceCallback;
}