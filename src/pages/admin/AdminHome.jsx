import { useDispatch, useSelector } from "react-redux";
import { SideBar } from "../../components";
import { useEffect, useState } from "react";
import {
  createNotify,
  removeNotify,
} from "./../../features/notify/notifySlice";
import dayjs from "dayjs";
import { confirmOrder } from "../../features/order/orderSlice";

const AdminHome = () => {
  const listNotify = useSelector((state) => state.notifyState);
  const listOrder = useSelector((state) => state.orderState);

  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();

  const handleSendNotify = () => {
    if (notify) {
      dispatch(createNotify({ notify }));
      setNotify("");
    }
  };
  const handleConfirmOrder = (id)=>{
    dispatch(confirmOrder({orderId: id}))
  }

  return (
    <>
      <div className="grid grid-cols-9 ">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="md:col-span-7 col-span-9">
          {/* <!-- main content --> */}
          <div className="border rounded-md h-full shadow-md container mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center p-3">
                <i className="fa-solid fa-arrow-trend-up rounded-full bg-red-400 text-4xl size-14 grid place-items-center text-white"></i>
                <p className="text-lg capitalize">tổng doanh thu</p>
                <p className="text-xl font-bold">10,000,000 VNĐ</p>
                <p className="text-sm capitalize">trong vòng 24h</p>
              </div>

              <div className="col-span-1 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center p-3">
                <i className="fa-solid fa-arrow-trend-up rounded-full bg-red-400 text-4xl size-14 grid place-items-center text-white"></i>
                <p className="text-lg capitalize">sô lượng order</p>
                <p className="text-xl font-bold">12 đơn</p>
                <p className="text-sm capitalize">trong vòng 24h</p>
              </div>

              <div className="col-span-1 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center p-3">
                <i className="fa-solid fa-book rounded-full bg-cyan-600 text-4xl size-14 grid place-items-center text-white"></i>
                <p className="text-lg capitalize">Số lượng sách</p>
                <p className="text-xl font-bold">10 cuốn</p>
                <p className="text-sm capitalize">trong kho</p>
              </div>
            </div>
            {/* Tạo thông báo */}
            <h1 className="mt-8 text-2xl capitalize font-bold tracking-wider flex items-center justify-between">
              <span>Thông Báo Gần Đây</span>
              <span className="mr-12">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("add-notify").showModal()
                  }
                >
                  Thêm Thông Báo Mới
                </button>
              </span>
              <dialog id="add-notify" className="modal">
                <div className="modal-box w-7/12 max-w-5xl">
                  {/* content */}
                  <h1 className="text-center mb-4">Thêm Thông Báo Mới!</h1>
                  <div className="modal-action">
                    <div className="w-10/12 mx-auto">
                      <input
                        type="text"
                        placeholder="Nhập Thông Báo"
                        className="input input-bordered w-full"
                        onChange={(e) => setNotify(e.target.value)}
                        value={notify}
                      />
                    </div>
                    <form method="dialog" onSubmit={handleSendNotify}>
                      <button className="btn">Đóng</button>
                      <button
                        type="submit"
                        className="btn btn-primary opacity-80 ml-4"
                      >
                        Gửi Thông Báo!
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </h1>
            <div className="mt-8 shadow-lg">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* <!-- head --> */}
                  <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Nội Dung</th>
                      <th>Ngày Thông Báo</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listNotify
                      .slice()
                      .reverse()
                      .map((i, index) => {
                        return (
                          <tr key={i.content}>
                            <td>{index + 1}</td>
                            <td>{i.content}</td>
                            <td>
                              {dayjs(i.createdDate)
                                .format("DD/MM/YYYY HH:mm")
                                .toString()}
                            </td>
                            <td>
                              <button
                                className="btn btn-error btn-sm"
                                onClick={() =>
                                  dispatch(removeNotify({ notify: i.content }))
                                }
                              >
                                Xoá
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <h1 className="mt-8 text-2xl capitalize font-bold tracking-wider">
              Đơn Hàng chờ xác nhận
            </h1>
            <div className="mt-8 shadow-lg">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* <!-- head --> */}
                  <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Mã Đơn Hàng</th>
                      <th>Tên Người Nhận</th>
                      <th>Ngày Đặt Hàng</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOrder.slice().reverse().map((i, index) => {
                      return (
                        <tr key={i.id}>
                          <td>{index+1}</td>
                          <td>{i.id}</td>
                          <td>{i.shippingAddress}</td>
                          <td>{i.createdDate}</td>
                          <td>{i.state.name}</td>
                          <td>
                            {
                              i.state.name != 'Đã Xác Nhận'
                              ?<button className="btn btn-primary text-white btn-sm" onClick={()=>handleConfirmOrder(i.id)}>
                              Xác Nhận
                            </button>
                              :<button className="btn btn-success btn-sm" >
                              Đã Xác Nhận
                            </button>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <h1 className="mt-8 text-2xl capitalize font-bold tracking-wider">
              Đơn đặt hàng gần đây
            </h1>
            <div className="mt-8 shadow-lg">
              <div className="overflow-x-auto">
                <table className="table table-zebra"> */}
                  {/* <!-- head --> */}
                  {/* <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Mã Đơn Hàng</th>
                      <th>Tên Người Nhận</th>
                      <th>Ngày Đặt Hàng</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOrder.map((i, index) => {
                      return (
                        <tr key={i.id + i.createdDate}>
                          <td>{index+1}</td>
                          <td>{i.id}</td>
                          <td>{i.shippingAddress}</td>
                          <td>{i.createdDate}</td>
                          <td>{i.state.name}</td>
                          <td>
                            <button className="btn btn-warning btn-sm">
                              Chi Tiết
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>*/}
          </div> 
        </div>
        {/* <!-- end content --> */}
      </div>
    </>
  );
};

export default AdminHome;
