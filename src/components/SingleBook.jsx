import { Link } from "react-router-dom";
import { book as bookIMG } from "../assets/img";
import { dinhDangTien } from "./../until.js";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice.js";

const SingleBook = ({ book }) => {
  const dispatch = useDispatch();
  const tiLeGiamGia = 0.2;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const orderDetail = {
      id: book.id,
      title: book.title,
      price: Math.floor((book.price - book.price * tiLeGiamGia) / 1000) * 1000,
      amount: 1,
    };
    dispatch(addItem({ orderDetail }));
  };
  return (
    <>
      <Link
        to={`book/${book.id}`}
        className={`card hover:shadow-lg hover:scale-105 transition duration-200 tooltip `}
        data-tip={book.title}
      >
        <figure className="p-6 size-60">
          <img src={book.listImage[0]} alt={book.title} className="max-h-60" />
        </figure>
        <div className="card-body pt-0">
          <p className="text-sm lg:text-md font-medium flex justify-between">
            <span className="book-price whitespace-nowrap">
              <span className="text-slate-400 line-through">
                {dinhDangTien(book.price)}đ
              </span>
              <span className="font-bold">
                {dinhDangTien(book.price - book.price * tiLeGiamGia)}
              </span>
            </span>
            <span className="bg-red-400 rounded-md font-bold px-1 text-white">
              {tiLeGiamGia * 100}%
            </span>
          </p>
          <h2 className="text-start card-title text-lg font-bold capitalize line-clamp-1">
            {book.title.trim()}
          </h2>
          <div className="card-actions" onClick={handleAddToCart}>
            <div
              href="#"
              className="capitalize flex gap-2 border-b-2 border-slate-400 hover:border-slate-800 transition duration-200"
            >
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
              <span>Thêm vào giỏ hàng</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SingleBook;
