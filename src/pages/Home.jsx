
import { useEffect, useState } from "react";
import { carouse, icon } from "../assets/img"
import { ListBook } from "../components"
import { getAllBook } from "../controller/BookController";

// export const loader = ({currentPage})=>{
//     console.log(currentPage);
//     const listBook = getAllBook({viTriHienTai:0, soLuongLay:8})
//     return {listBook: listBook}
// }

const Home = () => {
    const [numOfEle, setNumOfEle] = useState(8);
    const [listBook, setListBook] = useState([])
//   const {listBook} = useLoaderData({currentPage: 0});
    useEffect(()=>{
        const response = getAllBook({viTriHienTai:0, soLuongLay:numOfEle});
        setListBook([...response])
    },[numOfEle]);
return (
    <>
        {/* carousel */}
        <div className="px-8">
    <div className="carousel w-full rounded-md">
        <div id="slide1" className="carousel-item relative w-full">
            <img src={carouse.carousel1} className="w-full"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle ">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
            <img src={carouse.carousel2} className="w-full"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
            <img src={carouse.carousel3} className="w-full"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
            <img src={carouse.carousel4} className="w-full"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
</div>
        {/*end carousel */}
        <div className="container mx-auto mb-6">
    {/* <!-- category --> */}
    <div className="flex justify-around items-center mt-2 text-xs font-medium tracking-wide ">
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.conomic}
                 alt="conomic"/>
            <p className="whitespace-nowrap">Sách kinh tế</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.selfhelp}
                 alt="conomic"/>
            <p className="whitespace-nowrap">Sách Selfhelp</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.iconChildren}
                 alt="children"/>
            <p className="whitespace-nowrap">Sách Thiếu Nhi</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.history}
                 alt="history"/>
            <p className="whitespace-nowrap">Sách Lịch Sử</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.tongiao} alt="no"/>
            <p className="whitespace-nowrap">Sách Triết Học</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.literature}
                 alt="literature"/>
            <p className="whitespace-nowrap">Sách Văn Học</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.yhoc}
                 alt="yhoc"/>
            <p className="whitespace-nowrap">Sách Y Học</p>
        </a>
        <a href="#" className="hover:scale-105 ">
            <img className="rounded-full mx-auto size-10 sm:size-12" src={icon.tongiao}
                 alt="tongiao"/>
            <p className="whitespace-nowrap">Sách Tôn Giáo</p>
        </a>
    </div>
    {/* <!-- end category --> */}
    {/* <!-- best sale --> */}
    <div className="shadow-lg pb-8 rounded-xl">
        <div className="text-3xl capitalize font-bold p-8 pb-4"><i className="fa-solid fa-book-open"></i> sách bán chạy</div>
        <ListBook listBook={listBook}/>
        <div className="text-center">
            <button className="btn btn-outline btn-error capitalize" onClick={()=>setNumOfEle(numOfEle+8)}>Xem thêm</button>
        </div>
    </div>
    {/* <!-- end best sale --> */}
</div>
    </>
  )
}

export default Home