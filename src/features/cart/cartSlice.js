import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { applyDiscount as applyDiscountController } from './../../controller/OrderController'
import { OrderModel, enumPayment } from "../../model";

const initialState = {
    listItems: [],
    numItemsInCart: 0,
    rootPrice: 0,
    cartTotal: 0,
    discountPrice: 0,
    usedDiscount: ''
}

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || initialState
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),
    reducers: {
        addItem: (state, action) => {
            const { orderDetail } = action.payload
            const isExist = state.listItems.find(i => i.id === orderDetail.id);
            if (isExist) {
                isExist.amount += orderDetail.amount;
            } else {
                state.listItems.push(orderDetail);
            }
            state.numItemsInCart += orderDetail.amount;
            state.cartTotal += orderDetail.price * orderDetail.amount;
            state.rootPrice += orderDetail.price * orderDetail.amount;
            localStorage.setItem('cart', JSON.stringify(state));
            toast.success('Thêm Vào Giỏ Hàng Thành Công!')
        },
        removeItem: (state, action) => {
            const { item } = action.payload;
            state.listItems = state.listItems.filter(i => i.id !== item.id)
            state.cartTotal -= item.amount * item.price
            state.rootPrice -= item.amount * item.price
            state.numItemsInCart -= item.amount;
            localStorage.setItem('cart', JSON.stringify(state))
            toast.success('Xoá khỏi giỏ hàng thành công!')
        }, applyDiscount: (state, action) => {
            const { discount } = action.payload;
            try {
                if (state.usedDiscount === discount) {
                    throw new Error('Bạn đã sử dụng mã giảm giá!')
                }
                const { discountPrice, percentDiscount } = applyDiscountController(discount, state.rootPrice);
                state.usedDiscount = discount;
                state.discountPrice = discountPrice;
                state.cartTotal = state.rootPrice - discountPrice;
                localStorage.setItem('cart', JSON.stringify(state))

                toast.success(`Áp dụng thành công! Bạn được giảm thêm ${percentDiscount * 100}%`)
            } catch (error) {
                toast.error(error.message)
            }
        }, pay: (state, action) => {
            const { type } = action.payload;
            const payment = enumPayment[type.toUpperCase()];
            const { description, discountPercent, name, price } = payment.pay(state.cartTotal);

            state.cartTotal = state.rootPrice - state.discountPrice - price;
            toast.success(`${name} \n ${description || ''}`)
        },
        createOrder: (state, action) => {
            const { userInfo } = action.payload;
            console.log(userInfo);
            const order = new OrderModel({ id: userInfo.userName + state.cartTotal + state.listItems.length, shippingAddress: userInfo.address, userInfo })
            order.listOrderDetails = state.listItems.map(i => i);
            order.total = state.cartTotal;
            const message = order.pay();
            const listHistory = JSON.parse(localStorage.getItem('orderHistory')) || []
            listHistory.push(order);
            localStorage.setItem('orderHistory', JSON.stringify(listHistory));
            cartSlice.caseReducers.removeAll(state);
            toast.success(message)
        },
        removeAll: (state, action)=>{
            state = initialState;
            localStorage.setItem('cart', JSON.stringify(initialState))
            return initialState;
        }
    }
})

export const { addItem, removeItem, applyDiscount, pay, createOrder ,removeAll} = cartSlice.actions;
export default cartSlice.reducer