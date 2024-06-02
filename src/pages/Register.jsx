import { Form, Link, redirect } from "react-router-dom";
import { BreadCumbs, SubmitButton } from "../components";
import { register } from "../controller/UserController";
import { toast } from "react-toastify";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userInfo = Object.fromEntries(formData);
    
    try {
        register(userInfo);
        toast.success('Chúc mừng bạn đã đăng ký thành công!')
        return redirect('/login')
    } catch (error) {
        toast.error(error.message)
    }

  return null;
};


const Register = () => {
  const [password, setPassword] = useState('');
  const [isMatch, setIsMatch] = useState(true); 

  const handleChangeRePassword = (e)=>{
    const retypePass = e.target.value;
    if(password !== retypePass){
      setIsMatch(false);
      return;
    }
    setIsMatch(true)
    return;
  }

  return (
    <>
      <BreadCumbs currentPage={"Đăng Ký"} />
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-lg">
              <label className="block mt-3 text-gray-700 text-center font-semibold text-2xl">
                Đăng Ký
              </label>
              <Form className="mt-10" method="POST">
                <div>
                  <input
                  required
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Tên Đăng Nhập"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <input
                  required
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <input
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mật Khẩu"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <input
                  required
                  onChange={handleChangeRePassword}
                    id="RePassword"
                    name="RePassword"
                    type="password"
                    placeholder="Nhập Lại Mật Khẩu"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                  {!isMatch &&
                  <span className="text-red-500 font-mono">Mật khẩu không trùng khớp!!!</span>
                  }
                </div>

                <div className="mt-7">
                  <input
                  required
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Địa Chỉ"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7">
                  <input
                  required
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Số Điện Thoại"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7 flex gap-5">
                  <span className="flex gap-2">
                    Nam
                    <input
                      type="radio"
                      name="genre"
                      value={true}
                      className="radio radio-info"
                      defaultChecked
                    />
                  </span>
                  <span className="flex gap-2">
                    Nữ
                    <input
                      type="radio"
                      name="genre"
                      value={false}
                      className="radio radio-info"
                    />
                  </span>
                </div>
                <div className="mt-7">
                  <SubmitButton text={"Đăng Ký"} />
                </div>

                <div className="flex mt-7 items-center text-center">
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                  <label className="block font-medium text-sm text-gray-600 w-full">
                    <Link to={"/"}>Trang chủ</Link>
                  </label>
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="flex mt-7 justify-center w-full">
                  <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    <i className="fa-brands fa-facebook"></i>
                    Facebook
                  </button>

                  <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    <i className="fa-brands fa-google"></i>
                    Google
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2 text-black">
                      Bạn đã có tài khoản?
                    </label>
                    <Link
                      to={"/login"}
                      className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      Đăng Nhập
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
