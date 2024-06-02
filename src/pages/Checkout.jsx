import { BiPhoneIncoming } from "react-icons/bi";
import { Link, redirect } from "react-router-dom";
import { dinhDangTien, getAllProvinces } from "../until";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "../assets/img";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import { createOrder, pay, removeAll } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const loader = () => {
  getAllProvinces();
  return null;
};

const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartState);
  const user = useSelector((state) => state.userState.user);
  const [userInfo, setUserInfo] = useState({
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address
  })


  const handleChangeTypePayment = (type) =>{
    dispatch(pay({type}))
  }

  const handleCreateOrder = (e)=>{
    const [radio1, radio2] = document.getElementsByName('radio-10')
    if(!radio1.checked && !radio2.checked){
      e.preventDefault();
      toast.error('Vui lòng chọn phương thức thanh toán!')
      return;
    }

    dispatch(createOrder({userInfo}))
    dispatch(removeAll())
  }

  return (
    <div>
      <div className="flex justify-center text-2xl breadcrumbs border-b border-base-300 mb-6">
        <ul>
          <li>
              <Link to={"/cart"}>Giỏ Hàng</Link>
          </li>
          <li>
            <span className="underline">Thanh Toán</span>
          </li>
          <li>Xác Nhận</li>
        </ul>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-1">
        <div className="col-span-4 pt-10 px-40">
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Họ Và Tên" defaultValue={user?.fullName} onChange={e=>setUserInfo({...userInfo, fullName: e.target.value})}/>
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <BiPhoneIncoming className="text-slate-500" />
            <input type="text" className="grow" placeholder="Số Điện Thoại" defaultValue={user?.phoneNumber} onChange={e=>setUserInfo({...userInfo, phoneNumber: e.target.value})}/>
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" defaultValue={user?.email} onChange={e=>setUserInfo({...userInfo, email: e.target.value})}/>
          </label>
          <div className="grid grid-cols-3 gap-x-2 mb-4">
            <select className="select  select-bordered w-full max-w-xs">
              <option disabled selected>
                Tỉnh/Thành Phố
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
            <select className="select  select-bordered w-full max-w-xs">
              <option disabled selected>
                Quận/Huyện
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
            <select className="select  select-bordered w-full max-w-xs">
              <option disabled selected>
                Phường/Xã
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>
          <label className="input input-bordered flex items-center gap-2">
          <IoMdInformationCircleOutline className="size-5 text-slate-500"/>
            <input type="text" className="grow" placeholder="Địa chỉ giao hàng" defaultValue={user?.address} onChange={e=>setUserInfo({...userInfo, address: e.target.value})} />
          </label>
        </div>
        <div className="col-span-2 container p-8 place-items-center mx-auto">
          <div className="rounded-lg text-lg p-3 border border-cyan-400">
            <div className="border-b border-base-300 flex justify-between font-semibold">
              <span>
                <span>Sản phẩm</span>
              </span>
              <span>Tạm tính</span>
            </div>
            <ul className="border-b border-cyan-500 pb-5">
              {cart.listItems.map((i) => {
                return (
                  <li className="text-sm grid grid-cols-4" key={i.id}>
                    <div className="col-span-3 flex justify-between ">
                      <span className="line-clamp-1">{i.title}</span>
                      <span className="font-medium">
                        {i.amount}x{dinhDangTien(i.price)}
                      </span>
                    </div>
                    <div className="border-l border-cyan-500 ml-6 text-center overflow-hidden">
                      <strong>{dinhDangTien(i.price * i.amount)}</strong>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between border-b border-cyan-500 pb-2">
              <span className="font-semibold">Giảm Giá: </span>
              <span>{dinhDangTien(cart.discountPrice)}</span>
            </div>
            <div className="flex justify-between border-b border-cyan-500 pb-2">
              <span className="font-semibold">Tổng Tiền:</span>
              <span>{dinhDangTien(cart.cartTotal)}</span>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="atm-pay"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    value={'CART'}
                    onClick={(e)=>handleChangeTypePayment(e.target.value)}

                  />
                  <label htmlFor="atm-pay" className="label cursor-pointer tooltip" data-tip="Bạn được giảm thêm 5% nếu thanh toán qua atm">
                    Chuyển khoản ngân hàng (-5%)
                  </label>
                </div>
                <div className="size-8">
                  <img src={icon.mb} alt="sdf" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod-pay"
                    value={'CASH'}
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                    onClick={(e)=>handleChangeTypePayment(e.target.value)}

                  />
                  <label htmlFor="cod-pay" className="label cursor-pointer">
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <FaRegMoneyBillAlt className="size-8" />
              </div>
            </div>
            <div className="mt-3 ">
              <Link to={'confirm'} className="btn btn-primary w-full text-lg" onClick={handleCreateOrder}>
                Xác Nhận
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
