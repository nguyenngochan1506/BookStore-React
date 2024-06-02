import { Form, Link, redirect  } from "react-router-dom";
import { BreadCumbs, SubmitButton } from "../components";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import {login} from './../controller/UserController'

export const action = async (store, request)=>{
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  try {
    const response = login(user)
    store.dispatch(loginUser({...response}));
    toast.success('Đăng Nhập Thành Công!')
    return redirect('/')
  } catch (error) {
    toast.error(error.message);
  }
  return null;
}

const Login = () => {

  return (
    <>
      <BreadCumbs currentPage={"Đăng Nhập"} />

      <div className="font-sans">
        <div className="relative min-h-[80vh] flex flex-col sm:justify-center items-center">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-lg">
              <label className="block mt-3 text-gray-700 text-center font-semibold text-2xl">
                Đăng Nhập
              </label>
              <Form method="POST" className="mt-10">
                <div>
                  <input
                  defaultValue={'test@gmail.com'}
                    type="text"
                    name="userName"
                    id="username"
                    placeholder="Tên Đăng Nhập"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>

                <div className="mt-7">
                  <input
                  defaultValue={'123'}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mật Khẩu"
                    className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  />
                </div>
                <div className="mt-7">
                  <SubmitButton text={'Đăng Nhập'}/>
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
                      Bạn chưa có tài khoản?
                    </label>
                    <Link
                      to={"/register"}
                      className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      Đăng Ký Ngay
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

export default Login;
