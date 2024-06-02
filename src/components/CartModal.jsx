import { useDispatch, useSelector } from "react-redux";
import { dinhDangTien } from "../until";
import { removeItem } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartModal = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartState)
  const user = useSelector(state => state.userState.user)


  const handleRemoveItem = (item)=>{
  dispatch(removeItem({item}))
  }
  return (
    <div className="drawer drawer-end z-50 max-w-max">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-ghost btn-circle"
        >
          <div className="indicator z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 lg:size-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm badge-primary indicator-item ">
            {cart.numItemsInCart}
            </span>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {
            !cart.numItemsInCart 
            ?<span className="text-center font-bold text-lg">Giỏ Hàng Trống</span>
            :cart.listItems.map(i =>{
              return<li key={i.id}>
              <div>
                <div className="avatar">
                  <div className="size-14 rounded">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div>
                  <span className="line-clamp-2 font-medium">
                    {i.title}
                  </span>
                  <span>{i.amount} x {dinhDangTien(i.price)}</span>
                </div>
                <div>
                  <button className="btn btn-xs btn-circle btn-outline h-max" onClick={()=>handleRemoveItem(i)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
             })
          } 
          <li className="absolute bottom-0 w-full flex gap-y-1">
            <span  className="text-red-400 font-bold text-lg">Tổng Tiền: {dinhDangTien(cart.cartTotal)} </span>
            <Link to={'/cart'} className="btn btn-success">Xem Giỏ Hàng</Link>
            {user && cart.listItems.length!=0 && <Link to={'/checkout'} className="btn btn-primary">Thanh Toán</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartModal;
