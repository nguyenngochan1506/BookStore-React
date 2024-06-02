import { Link } from "react-router-dom"
import { dinhDangTien } from "../until"
import { useDispatch } from "react-redux"
import { removeItem } from "../features/cart/cartSlice"

const CartItemSingle = ({item}) => {
  const dispatch = useDispatch()
  return (
    <div className=" px-6 justify-between items-center mt-4 ">
        <div className="grid grid-cols-8 border-b border-base-300 pb-2">
        <div className="avatar col-span-1">
          <div className="size-14 rounded ">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="col-span-5">
            <Link to={`/book/${item.id}`} className="font-medium line-clamp-1 " >{item.title}</Link>
            <div>{item.amount} x {dinhDangTien(item.price)}</div>
          </div>
          <div className="col-span-1 font-semibold text-end">{dinhDangTien(item.amount*item.price)}</div>
          <div className="col-span-1 flex justify-end">
          <button className="btn btn-sm btn-circle btn-outline h-max " onClick={()=>dispatch(removeItem({item}))}>
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
      </div>
  )
}

export default CartItemSingle