import { useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser as updateUserController } from "../controller/UserController";
import { updateUserInfo } from "../features/user/userSlice";


const Profile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isSubmitting = (navigation.state === "submitting");
  const userFromData = useSelector((state) => state.userState.user);
  const [user, setUser] = useState(userFromData);
  
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setUser({ ...user, avatar: base64 });
    };
    reader.readAsDataURL(file);
  };
 
  const handleUpdateProfile = () =>{
    //kiểm tra password
    const rePass = document.querySelector('#RePassword').value
    if(rePass !== user.password){
        toast.error('Mật khẩu không trùng khớp!')
        return;
    }
    const confirm = window.confirm('Bạn có chắc chắn muốn thay đổi!');
    if(!confirm) return;
    const newUserInfo = updateUserController(user);
    dispatch(updateUserInfo({user:newUserInfo}));
  }
  return (
    <div className="container mx-auto mt-8 ">
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="avatar">
          {user.avatar ? (
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} />
            </div>
          ) : (
            <FaUser className="size-32" />
          )}
        </div>
        <input
          type="file"
          name="avatar"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          accept="image/*"
          onChange={handleChangeAvatar}
        />
      </div>
      <div className="w-[70%] mx-auto">
        <div className="mt-10">
          <div>
          <label htmlFor="userName" className="label">Tên Đăng Nhập</label>
            <input
            readOnly
              defaultValue={user.userName}
              id="userName"
              name="userName"
              type="text"
              placeholder="Tên Đăng Nhập"
              required
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>
          <div className="mt-7">
            <label htmlFor="fullName" className="label">Họ Và Tên</label>
            <input
              required
              onChange={(e)=>{setUser({...user, fullName: e.target.value})}}
              defaultValue={user.fullName}
              name="fullName"
              id="fullName"
              type="fullName"
              placeholder="fullName"
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>
          <div className="mt-7">
            <label htmlFor="email" className="label">Email</label>
            <input
              required
              onChange={(e)=>{setUser({...user, email: e.target.value})}}
              defaultValue={user.email}
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div className="mt-7">
          <label htmlFor="password" className="label">Mật Khẩu</label>

            <input
              required
              onChange={(e)=>{setUser({...user, password: e.target.value})}}
              defaultValue={user.password}
              id="password"
              name="password"
              type="password"
              placeholder="Mật Khẩu"
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div className="mt-7">
            <label htmlFor="RePassword" className="label">Nhập Lại Mật Khẩu</label>
            <input
              required
              defaultValue={user.password}
              id="RePassword"
              name="RePassword"
              type="password"
              placeholder="Nhập Lại Mật Khẩu"
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
            {/* {!isMatch &&
                  <span className="text-red-500 font-mono">Mật khẩu không trùng khớp!!!</span>
                  } */}
          </div>

          <div className="mt-7">
            <label htmlFor="address" className="label">Địa Chỉ</label>
            <input
              required
              onChange={(e)=>{setUser({...user, address: e.target.value})}}
              defaultValue={user.address}
              id="address"
              name="address"
              type="text"
              placeholder="Địa Chỉ"
              className="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>
          <div className="mt-7">
            <label htmlFor="phoneNumber" className="label">Số Điện Thoại</label>
            <input
              required
              onChange={(e)=>{setUser({...user, phoneNumber: e.target.value})}}
              defaultValue={user.phoneNumber}
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
                onChange={(e)=>setUser({...user, genre: e.target.value === 'true'})}
                defaultChecked={user.genre}
              />
            </span>
            <span className="flex gap-2">
              Nữ
              <input
                type="radio"
                name="genre"
                value={false}
                onChange={(e)=>setUser({...user, genre: e.target.value === 'true'})}
                className="radio radio-info"
              />
            </span>
          </div>
          <div className="mt-7 mb-7 flex justify-center ">
            <button
            onClick={handleUpdateProfile}
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Thay Đổi Thông Tin" || "submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
