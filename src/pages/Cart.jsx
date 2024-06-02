import { Link } from "react-router-dom";
import { CartItemList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { dinhDangTien } from "../until";
import { MdDiscount } from "react-icons/md";
import { useState } from "react";
import { applyDiscount } from "../features/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cartState);
  const user = useSelector(state => state.userState.user)
  const [discount, setDiscount] = useState('');
  const dispatch = useDispatch();

  const handleDiscount = () =>{
    if(!discount) return;
    dispatch(applyDiscount({discount}));
  }
  return (
    <div className="md:h-[80vh]">
      <div className="flex justify-center text-2xl breadcrumbs border-b border-base-300 mb-6">
        <ul>
          <li>
            <span className="underline">Giỏ Hàng</span>
          </li>
          <li>
            <span>Thanh Toán</span>
          </li>
          <li>Xác Nhận</li>
        </ul>
      </div>
      {!cart.numItemsInCart ? (
        <h1 className="text-2xl text-center">Giỏ Hàng Trống!</h1>
      ) : (
        <div className="grid md:grid-cols-6 grid-cols-1">
          <div className="col-span-4 h-[70vh] overflow-scroll">
            <CartItemList listCartItems={cart.listItems} />
          </div>
          <div className="col-span-2 container p-10">
            <div className="bg-base-200 rounded-lg text-lg p-3">
              <div className="border-b border-base-300 flex justify-between">
                <span className="font-semibold">Tổng Số Lượng:</span> <span>{cart.numItemsInCart}</span>
              </div>
              <div className="flex justify-between border-b border-base-300 ">
                <span className="font-semibold">Giá Gốc: </span>
                <span>{dinhDangTien(cart.rootPrice)}</span>
              </div>
              <div className="flex justify-between border-b border-base-300 mt-4">
                <span className="font-semibold">Giảm Giá:</span>
                <span>{dinhDangTien(cart.discountPrice)}</span>
              </div>
              <div className="flex justify-between border-b border-base-300 ">
                <span className="font-semibold">Tổng Tiền:</span>
                <span>{dinhDangTien(cart.cartTotal)}</span>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <MdDiscount className="inline-block" /> Mã giảm giá (nếu có)
              </div>
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <input
                  defaultValue={discount}
                  onChange={(e)=>setDiscount(e.target.value)}
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button className="btn  btn-warning btn-sm line-clamp-1" onClick={handleDiscount}>
                    Áp dụng
                  </button>
                </div>
              </div>
              {cart.usedDiscount && <span className="text-red-500">Đã Áp Mã: {cart.usedDiscount}</span>}
            </div>
            <div className="mt-3 ">
              {user
              ?<Link to={"/checkout"} className="btn btn-primary w-full text-lg">
                Thanh Toán
              </Link>
              :<span>
              <Link to={"/login"} className="btn btn-primary w-full text-lg">Đăng Nhập</Link>
              <span className="text-md text-red-500 ">Vui lòng đăng nhập để thanh toán</span>
              </span>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
