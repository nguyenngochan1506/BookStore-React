import { useLoaderData } from "react-router-dom";
import { book as bookimg } from "../assets/img";
import { getBookById } from "../controller/BookController";
import { dinhDangTien } from "../until";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { addItem } from "../features/cart/cartSlice";

export const loader = ({params})=>{
  const book  = getBookById(params.id);
  return {book: book};
} 
const BookDetail = () => {
  const dispatch = useDispatch();

  const {book} = useLoaderData();
  const {id, title, isbn, numberPages, coverType, description, price, publicationDate, publisher, listCategories, listImage, listAuthors, listRating, inventory} = book;
  const tiLeGiamGia = 0.2;
  const [orderDetail, setOrderDetail] = useState({id, title, price: Math.floor((price - price*tiLeGiamGia)/1000)*1000, amount: 1})


  const handleIncreaseAmount = ()=>{
    const currentAmount = orderDetail.amount;
    if(currentAmount >= inventory){
      toast.error('Số lượng còn lại không đủ!');
      return;
    }
    const increaseAmount = Number.parseInt(currentAmount) +1 
    setOrderDetail({...orderDetail, amount: increaseAmount});
  }
  const handleDecreaseAmount = ()=>{
    const currentAmount = orderDetail.amount;
    if(orderDetail.amount <= 1){
      toast.error('Vui lòng nhập số lượng cần mua!')
      return;
    }
    const decreaseAmount = Number.parseInt(currentAmount) - 1;
    setOrderDetail({...orderDetail, amount: decreaseAmount});
  }
  const handleOnChangeAmount = (e) => {
    const changeValue = e.target.value;
    if(changeValue >= inventory){
      toast.error('Số lượng không đủ!')
      return;
    }
    if(changeValue <= 0){
      toast.error('Số lượng không nhỏ hơn 1!')
      return;
    }
    setOrderDetail({...orderDetail, amount: changeValue})
  }

  const handleAddToCart = ()=>{
    dispatch(addItem({orderDetail}))
  }

  return (
    <main className="container mx-auto mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 shadow-lg pb-8 rounded-md">
        {/* <!-- carousel --> */}
        <div className="md:col-span-2 flex justify-center">
          <div className="w-80 carousel rounded-md">
            {listImage.map((img, index)=> {
              return <div className="carousel-item w-full relative" id={`slide${index}`} key={index}>
              <img
                src={img}
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${index==0 ? listImage.length : index-1}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${index == listImage.length ? 0 : index+1}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            })}
          </div>
        </div>
        <div className="md:col-span-3 tracking-tighter font-medium mt-8 text-md pl-8">
          <div className="text-3xl capitalize font-medium tracking-wider">
            {title}
          </div>
          <div className="mt-6">
            <span className="rounded-lg w-max text-red-500 font-bold text-2xl">
              {dinhDangTien(orderDetail.amount * price - orderDetail.amount * price * tiLeGiamGia)}
            </span>
            <span className="rounded-lg bg-red-600 w-max px-2 text-white">
              -{tiLeGiamGia*100}%
            </span>
            <span className="text-sm font-normal text-slate-600 line-through">
            {dinhDangTien(orderDetail.amount * price)}
            </span>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <p>Tác giả: {listAuthors.map(author=> author)}</p>
            <p>Ngày xuất bản: {dayjs(publicationDate).format('DD/MM/YYYY')}</p>
            <p>Nhà xuất bản: {publisher}</p>
            <p>Số trang: {numberPages}</p>
            <p>Hình thức bìa: {coverType}</p>
            <p>Thể loại: {listCategories.map(cate => cate)}</p>
          </div>
          <div className="mt-4">
            <div>Số lượng còn lại: {inventory}</div>
            <span>Số lượng: </span>
            <div className="join">
            <button className="btn btn-base-400 font-bold text-lg btn-sm join-item" onClick={handleDecreaseAmount}>
                -
              </button>
             
              <input
                type="number"
                name="soLuong"
                id="soLuong"
                className="input-sm join-item"
                min={1}
                value={orderDetail.amount}
                placeholder="Số lượng"
                onChange={handleOnChangeAmount}
                style={{
                    width: '5rem !important',
                    paddingLeft: '1rem'
                }}
              />
              <button className="btn btn-base-400 font-bold text-lg btn-sm join-item" onClick={handleIncreaseAmount}>
                +
              </button>
            </div>
          </div>
          <div className="text-lg flex gap-2 justify-center mt-8 md:justify-normal">
            <button className="btn btn-outline btn-error tracking-wider capitalize" onClick={handleAddToCart}> 
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
              <span >Thêm vào giỏ hàng</span>
            </button>
            <button className="btn btn-error text-white tracking-wider capitalize">
              mua ngay
            </button>
          </div>
        </div>
      </div>
      {/* <!-- mô tả --> */}
      <div className="shadow-lg pb-8 rounded-md p-8">
        <div className="capitalize text-2xl tracking-wider font-medium mt-8">
          thông tin chi tiết
        </div>
        <div className="mb-4">
          <p>
            Mã hàng: <strong>{isbn}</strong>
          </p>
          <p>
            Tác giả: <strong>{listAuthors.map(author => author)}</strong>
          </p>
          <p>
            NXB: <strong>{publisher}</strong>
          </p>
          <p>
            {" "}
            Năm XB: <strong>{dayjs(publicationDate).format('DD/MM/YYYY')}</strong>
          </p>
          <p>
            {" "}
            Số trang: <strong>{numberPages}</strong>
          </p>
          <p>
            Hình thức: <strong>{coverType}</strong>
          </p>
        </div>
        <p>
         {description}
        </p>
      </div>
      {/* <!-- Sách liên quan --> */}
      <div className="shadow-lg pb-8 rounded-md hidden sm:block">
        <div className="text-2xl tracking-wider capitalize font-medium mt-8 p-4">
          Sách liên quan
        </div>
        <div
          id="sachLienQuan"
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 flex-wrap"
        ></div>
      </div>
      {/* <!-- review --> */}
      <div className="shadow-lg pb-8 rounded-md hidden sm:block">
        <div className="text-2xl tracking-wider capitalize font-medium mt-8 p-4">
          Đánh giá
        </div>
        <div className=" grid grid-cols-5">
          <div className="col-span-1 flex items-center flex-col">
            <strong className="text-3xl">5/5</strong>
            <div className="text-xl">
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-regular fa-star text-orange-400"></i>
            </div>
            <div className="text-slate-600">(7 đánh giá)</div>
          </div>
          <div className="col-span-4 px-2 text-end">
            <textarea
              placeholder="Bình Luận"
              className="textarea textarea-bordered textarea-md w-full resize-none"
            ></textarea>
            <button className="btn bg-red-400 hover:bg-orange-400 tracking-wide font-medium text-white ">
              Bình Luận
            </button>
          </div>
        </div>
        <hr className="mt-2 mb-3" />
        <div className="comment grid grid-cols-5">
          <div className="col-span-1 flex items-center flex-col">
            <strong>Nguyễn Ngọc Hân</strong>
            <span>11/11/2011</span>
            <div className="text-sm">
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-solid fa-star text-orange-400"></i>
              <i className="fa-regular fa-star text-orange-400"></i>
            </div>
          </div>
          <div className="col-span-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
            pariatur sit mollitia quisquam ipsam qui sequi quaerat ab ut vitae,
            explicabo iusto accusamus nesciunt corporis adipisci maxime
            veritatis quae blanditiis.
          </div>
        </div>
      </div>
      {/* <!-- Chính sách --> */}
      <div className="shadow-lg p-3 rounded-md flex items-center justify-center">
        <div className="grid grid-cols-3 gap-x-8 ">
          <div className="flex flex-col items-center">
            <span className="capitalize text-2xl font-medium">
              {" "}
              hàng ngàn quà tặng
            </span>
            <i className="fa-solid fa-gift text-2xl"></i>
          </div>
          <div className="flex flex-col items-center">
            <span className="capitalize text-2xl font-medium">
              {" "}
              giao hàng siêu tốc
            </span>
            <i className="fa-solid fa-truck-fast  text-2xl"></i>
          </div>
          <div className="flex flex-col items-center">
            <span className="capitalize text-2xl font-medium">
              {" "}
              Chính sách đổi trả
            </span>
            <i className="fa-solid fa-handshake-simple text-2xl"></i>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetail;
