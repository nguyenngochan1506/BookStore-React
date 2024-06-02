import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, toggleTheme } from "../features/user/userSlice";
import CartModal from "./CartModal";
import { useEffect, useState } from "react";
import { searchBook } from "./../controller/BookController";
import { useDebounce } from "../until";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceSearch = useDebounce(searchText, 1000);
  const [resultSearch, setResultSearch] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      const response = await searchBook(debounceSearch);
      setResultSearch(response);
      setLoading(false);
    };
    request();
  }, [debounceSearch]);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="navbar bg-base justify-between">
      <div className="flex">
        <Link to={"/"} className="btn btn-ghost text-xl">
          BookStore
        </Link>
      </div>
      <div className="w-[50%] relative">
        {/* Phần tìm kiếm */}
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="search"
            className="grow"
            placeholder="Tìm Kiếm"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-6 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        {debounceSearch && (
          <ul className="absolute border top-12 z-10 bg-white w-full rounded-lg pb-4 shadow-lg max-h-[60vh] overflow-scroll">
            {
              loading
              ?<div className="text-center"><span className="loading loading-dots loading-lg text-center"></span></div>
              : resultSearch.length == 0 ? <div className="text-center">Không tìm thấy kết quả</div>
              : resultSearch.map((s) => {
                return (
                  <li key={s.id} className="mt-3 px-2 hover:bg-base-200">
                    <Link className="flex" to={`book/${s.id}`}>
                      <img src={s.listImage[0]} alt="icon" className="size-14" />
                      <div>
                        <div className="line-clamp-1 text-md font-semibold">
                          {s.title}
                        </div>
                        <div className="text-xs">
                          <span className="font-semibold">Tác Giả:</span>{" "}
                          {s.listAuthors.map((a) => a)}
                        </div>
                        <div className="text-xs">
                          <span className="font-semibold">Thể Loại:</span>{" "}
                          {s.listCategories.map((a) => a).join(", ")}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        )}
      </div>
      <div className="flex-none">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            id="my-custom-theme"
            onClick={handleTheme}
          />
          <i className="fa-regular fa-moon text-2xl lg:text-3xl swap-on fill-current"></i>
          <i className="fa-regular fa-sun text-2xl lg:text-3xl swap-off fill-current"></i>
        </label>

        <CartModal />
        {!user && (
          <div className="">
            <Link
              to={"/login"}
              className="btn btn-sm lg:btn-md lg:text-lg btn-primary rounded-3xl"
            >
              Đăng Nhập
            </Link>
          </div>
        )}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <img src={user.avatar} alt="" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#">
                  <strong>{user.userName}</strong>
                </a>
              </li>
              <hr />
              {
                user.listRole.includes('ADMIN') 
                &&
                <li>
                <Link to={'/admin'}>
                  <strong>Quản Lý Bán Hàng</strong>
                </Link>
              <hr />
              </li>
              }
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/order-history"} className="justify-between">
                  Lịch sử đơn hàng
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
